import React, { Component } from 'react';

import styles from './selectionContainer.scss';
import { prepareStylesPropValue } from '../../../../utils/cssUtils';
import { MouseButtonCodes } from '../../../../utils/MouseButtonsCodes';
import { addEventListenerShim } from '../../../../utils/eventListenerShim';

/**
 * @typedef {Object} IElementBounds
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef {Object} IPointerData
 * @property {number} x
 * @property {number} y
 */

/**
 * @enum
 */
export const ResizeCornerId = {
    TOP_LEFT: 'tl',
    TOP_RIGHT: 'tr',
    BOTTOM_LEFT: 'bl',
    BOTTOM_RIGHT: 'br',
};

export const RESIZE_CORNER_DATA_ATTRIBUTE = 'data-resize-corner-id';

/**
 * @param {IElementBounds} state
 * @return
 */
const transformStateToStyle = state => {
    const moveStyle = {};
    if (state.width != null) {
        moveStyle.width = prepareStylesPropValue(state.width);
    }
    if (state.height != null) {
        moveStyle.height = prepareStylesPropValue(state.height);
    }
    if (state.x != null) {
        moveStyle.left = prepareStylesPropValue(state.x);
    }
    if (state.y != null) {
        moveStyle.top = prepareStylesPropValue(state.y);
    }

    return moveStyle;
};

/**
 * @param {IElementBounds} currentBounds
 * @param {IElementSize} parentWidth
 * @return {boolean}
 */
const isSelectionWidthMoreThanParentWidth = (currentBounds, parentWidth) =>
    currentBounds.x + currentBounds.width > parentWidth.width;

/**
 * @param {IElementBounds} currentBounds
 * @param {IElementSize} parentWidth
 * @return {boolean}
 */
const isSelectionHeightMoreThanParentHeight = (currentBounds, parentWidth) =>
    currentBounds.y + currentBounds.height > parentWidth.height;

/**
 * @typedef {Object} IBaseSelectionContainerProps
 * @property {IElementSize} parentSize
 * @property {number} minWidth
 * @property {number} minHeight
 * @property {boolean} isSquareMode
 * @property {boolean} inParentOnly
 */

/**
 * @param {IBaseSelectionContainerProps} selectionContainerProps
 * @param {IElementBounds} currentBounds
 * @return {IElementBounds}
 */
const fitSelectionSizeForParent = (selectionContainerProps, currentBounds) => {
    const {
        parentSize: { width: parentWidth, height: parentHeight },
        minWidth,
        minHeight,
        isSquareMode,
    } = selectionContainerProps;

    const { x, y, width, height } = currentBounds;

    let resultX = x;
    let resultY = y;
    let resultWidth = width;
    let resultHeight = height;

    if (resultX + resultWidth > parentWidth) {
        resultWidth = parentWidth - resultX;
        if (resultWidth < minWidth) {
            resultWidth = minWidth;
            resultX = parentWidth - resultWidth;
        }
    }

    if (resultY + resultHeight > parentHeight) {
        resultHeight = parentHeight - resultY;
        if (resultHeight < minHeight) {
            resultHeight = minHeight;
            resultX = parentHeight - resultHeight;
        }
    }

    if (isSquareMode) {
        resultHeight = resultWidth = Math.min(resultHeight, resultWidth);
    }

    return {
        x: resultX,
        y: resultY,
        width: resultWidth,
        height: resultHeight,
    };
};

/**
 * @implements {EventListener}
 */
export class SelectionContainer extends Component {

    state = {
        x: null,
        y: null,
        width: null,
        height: null,
    };

    _resizeBounds = {
        minX: null,
        maxX: null,

        minY: null,
        maxY: null,

        minWidth: null,
        maxWeight: null,

        minHeight: null,
        maxHeight: null,
    };

    _stateFromMovingStart = null;

    _startPointerX = 0;
    _startPointerY = 0;
    _isDragStarted = false;
    _isCornerDragStarted = false;
    _movingCornerId = null;

    _zoneRef = React.createRef();

    componentDidMount() {
        document.addEventListener('mousemove', this);
        document.addEventListener('mouseup', this);
        addEventListenerShim(document, 'touchmove', this, { passive: false });
        addEventListenerShim(document, 'touchend', this, { passive: false });

        const zone = this._zoneRef.current;
        addEventListenerShim(zone, 'touchstart', this._onZoneTouchStart, {
            passive: false,
        });

        let initialBounds;

        // get from props
        if (this.props.initialBounds) {
            initialBounds = this.props.initialBounds;
        } else {
            const clientRect = zone.getBoundingClientRect();
            const parentClientRect = this._getParentClientRect();
            initialBounds = {
                width: clientRect.width,
                height: clientRect.height,
                x: clientRect.x - parentClientRect.x,
                y: clientRect.y - parentClientRect.y,
            };
        }

        this.setState(initialBounds);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this);
        document.removeEventListener('mouseup', this);
        document.removeEventListener('touchmove', this);
        document.removeEventListener('touchend', this);
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {IBaseSelectionContainerProps} nextProps
     * @param {IElementBounds} prevState
     * @return {null|IElementBounds}
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        const { parentSize, inParentOnly } = nextProps;

        if (
            inParentOnly &&
            parentSize &&
            (isSelectionWidthMoreThanParentWidth(prevState, parentSize) ||
                isSelectionHeightMoreThanParentHeight(prevState, parentSize))
        ) {
            return fitSelectionSizeForParent(nextProps, prevState);
        }

        return null;
    }

    notifyAboutAnyChange() {
        const { onAnyChange } = this.props;

        if (onAnyChange) {
            onAnyChange(this.state);
        }
    }

    /**
     * @param {Event} e
     */
    handleEvent(e) {
        switch (e.type) {
            case 'mousemove':
                this._documentMouseMove(e);
                break;
            case 'mouseup':
            case 'touchend':
                this._documentPointerUp(e);
                break;
            case 'touchmove':
                this._documentPointerMove(e);
                break;
        }
    }

    _prepareForMoving() {
        this._isDragStarted = true;
    }

    /**
     * @param {ResizeCornerId} cornerId
     * @private
     */
    _calcResizeBounds(cornerId) {
        const props = this.props;

        const stateFromMovingStart = this._stateFromMovingStart;
        const startX = stateFromMovingStart.x;
        const startY = stateFromMovingStart.y;
        const startWidth = stateFromMovingStart.width;
        const startHeight = stateFromMovingStart.height;

        let minWidth = props.minWidth || 0;
        let minHeight = props.minHeight || 0;
        if (props.isSquareMode) {
            minWidth = minHeight = Math.max(minWidth, minHeight);
        }

        const baseMaxWidth = props.maxWidth || Infinity;
        const baseMaxHeight = props.maxHeight || Infinity;
        let maxWidth;
        let maxHeight;

        let minX = -Infinity;
        let minY = -Infinity;
        let maxX = startX + (startWidth - minWidth);
        let maxY = startY + (startHeight - minHeight);

        if (props.inParentOnly) {
            const parentRect = this._getParentClientRect();

            switch (cornerId) {
                case ResizeCornerId.TOP_RIGHT:
                    maxWidth = Math.floor(parentRect.width - startX);
                    maxHeight = startHeight + startY;
                    break;
                case ResizeCornerId.BOTTOM_RIGHT:
                    maxWidth = Math.floor(parentRect.width - startX);
                    maxHeight = Math.floor(parentRect.height - startY);
                    break;
                case ResizeCornerId.TOP_LEFT:
                    maxWidth = startWidth + startX;
                    maxHeight = startHeight + startY;
                    break;
                case ResizeCornerId.BOTTOM_LEFT:
                    maxWidth = startWidth + startX;
                    maxHeight = Math.floor(parentRect.height - startY);
                    break;
            }

            if (maxWidth > baseMaxWidth) {
                maxWidth = baseMaxWidth;
            }
            if (maxHeight > baseMaxHeight) {
                maxHeight = baseMaxHeight;
            }

            if (props.isSquareMode) {
                maxWidth = maxHeight = Math.min(maxWidth, maxHeight);
            }

            minX = startX - (maxWidth - startWidth);
            minY = startY - (maxHeight - startHeight);
        }

        this._resizeBounds = {
            minX,
            maxX,
            minY,
            maxY,
            minWidth,
            maxWidth,
            minHeight,
            maxHeight,
        };
    }

    /**
     * @param {!ResizeCornerId} cornerId
     * @private
     */
    _prepareForResizing(cornerId) {
        this._movingCornerId = cornerId;
        this._calcResizeBounds(cornerId);
        this._isCornerDragStarted = true;
    }

    /**
     * @param {IPointerData} pointerData
     * @param {?ResizeCornerId} cornerId
     * @private
     */
    _interactionStart(pointerData, cornerId) {
        this._startPointerX = pointerData.x;
        this._startPointerY = pointerData.y;
        this._stateFromMovingStart = this.state;

        if (cornerId !== null) {
            this._prepareForResizing(cornerId);
        } else {
            this._prepareForMoving();
        }
    }

    /**
     * @param {TouchEvent} e
     * @private
     */
    _onZoneTouchStart = e => {
        e.preventDefault();
        e.stopPropagation();

        const touch = e.targetTouches[0];
        const pointerData = {
            x: touch.clientX,
            y: touch.clientY,
        };
        const cornerId = touch.target.getAttribute(RESIZE_CORNER_DATA_ATTRIBUTE);

        this._interactionStart(pointerData, cornerId);
    };

    /**
     * @param {MouseEvent} e
     * @private
     */
    _onZoneMouseDown = e => {
        e.preventDefault();
        e.stopPropagation();

        if (e.button === MouseButtonCodes.LEFT) {
            const pointerData = {
                x: e.clientX,
                y: e.clientY,
            };
            const cornerId = e.target.getAttribute(RESIZE_CORNER_DATA_ATTRIBUTE);

            this._interactionStart(pointerData, cornerId);
        }
    };

    /**
     * @return {!ClientRect}
     * @private
     */
    _getParentClientRect() {
        const zoneElement = this._zoneRef.current;
        const zoneElementParent = zoneElement.parentNode;
        return zoneElementParent.getBoundingClientRect();
    }

    /**
     * @param {!number} resultX
     * @return {!number}
     * @private
     */
    _processMoveByXInParent(resultX) {
        // check min
        if (resultX < 0) {
            return 0;
        }

        // check max
        const zoneWidth = this.state.width;
        const parentWidth = this._getParentClientRect().width;
        if (resultX + zoneWidth > parentWidth) {
            return parentWidth - zoneWidth;
        }

        return resultX;
    }

    /**
     * @param {!number} resultY
     * @return {!number}
     * @private
     */
    _processMoveByYInParent(resultY) {
        // check min
        if (resultY < 0) {
            return 0;
        }

        // check max
        const zoneHeight = this.state.height;
        const parentHeight = this._getParentClientRect().height;
        if (resultY + zoneHeight > parentHeight) {
            return parentHeight - zoneHeight;
        }

        return resultY;
    }

    /**
     * @param {IPointerData} pointerData
     * @private
     */
    _moveZone(pointerData) {
        const xDiff = pointerData.x - this._startPointerX;
        const yDiff = pointerData.y - this._startPointerY;

        const stateFromMovingStart = this._stateFromMovingStart;
        let x = stateFromMovingStart.x + xDiff;
        let y = stateFromMovingStart.y + yDiff;

        if (this.props.inParentOnly) {
            x = this._processMoveByXInParent(x);
            y = this._processMoveByYInParent(y);
        }

        this.setState({
            x,
            y,
        });

        this.notifyAboutAnyChange();
    }

    /**
     * @param {IPointerData} pointerData
     * @private
     */
    _moveCorner(pointerData) {
        const props = this.props;
        const movingCornerId = this._movingCornerId;

        let xDiff = pointerData.x - this._startPointerX;
        let yDiff = pointerData.y - this._startPointerY;
        let { x, y, width, height } = this._stateFromMovingStart;

        if (props.isSquareMode) {
            if (movingCornerId === ResizeCornerId.TOP_RIGHT || movingCornerId === ResizeCornerId.BOTTOM_LEFT) {
                yDiff = -xDiff;
            } else {
                yDiff = xDiff;
            }
        }

        // calc changes by diff
        switch (movingCornerId) {
            case ResizeCornerId.TOP_LEFT:
                x = x + xDiff;
                y = y + yDiff;
                width = width - xDiff;
                height = height - yDiff;
                break;

            case ResizeCornerId.TOP_RIGHT:
                y = y + yDiff;
                width = width + xDiff;
                height = height - yDiff;
                break;

            case ResizeCornerId.BOTTOM_LEFT:
                x = x + xDiff;
                width = width - xDiff;
                height = height + yDiff;
                break;

            case ResizeCornerId.BOTTOM_RIGHT:
                width = width + xDiff;
                height = height + yDiff;
                break;
        }

        // fix by bounds
        const resizeBounds = this._resizeBounds;
        if (width < resizeBounds.minWidth) {
            width = resizeBounds.minWidth;
        } else if (width > resizeBounds.maxWidth) {
            width = resizeBounds.maxWidth;
        }

        if (height < resizeBounds.minHeight) {
            height = resizeBounds.minHeight;
        } else if (height > resizeBounds.maxHeight) {
            height = resizeBounds.maxHeight;
        }

        if (x > resizeBounds.maxX) {
            x = resizeBounds.maxX;
        } else if (x < resizeBounds.minX) {
            x = resizeBounds.minX;
        }

        if (y > resizeBounds.maxY) {
            y = resizeBounds.maxY;
        } else if (y < resizeBounds.minY) {
            y = resizeBounds.minY;
        }

        // commit
        this.setState({
            x,
            y,
            width,
            height,
        });

        this.notifyAboutAnyChange();
    }

    /**
     * @param {IPointerData} pointerData
     * @private
     */
    _pointerMove(pointerData) {
        if (this._isCornerDragStarted) {
            this._moveCorner(pointerData);
        } else if (this._isDragStarted) {
            this._moveZone(pointerData);
        }
    }

    /**
     * @param {MouseEvent} e
     * @private
     */
    _documentMouseMove(e) {
        if (this._isCornerDragStarted || this._isDragStarted) {
            e.preventDefault();
        }

        const pointerData = {
            x: e.clientX,
            y: e.clientY,
        };

        this._pointerMove(pointerData);
    }

    /**
     * @param {TouchEvent} e
     * @private
     */
    _documentPointerMove(e) {
        if (this._isCornerDragStarted || this._isDragStarted) {
            e.preventDefault();
        }

        const touch = e.targetTouches[0];
        const pointerData = {
            x: touch.clientX,
            y: touch.clientY,
        };

        this._pointerMove(pointerData);
    }

    /**
     * @param {MouseEvent} e
     * @private
     */
    _documentPointerUp(e) {
        if (this._isCornerDragStarted || this._isDragStarted) {
            e.preventDefault();
        }

        if (this._isCornerDragStarted) {
            this._movingCornerId = null;
            this._isCornerDragStarted = false;
        } else {
            this._isDragStarted = false;
        }

        this._stateFromMovingStart = null;

        if (this._stateFromMovingStart !== this.state && this.props.onChange) {
            this.props.onChange(this.state);
        }
    }

    render() {
        const { children } = this.props;
        const state = this.state;
        const moveStyle = transformStateToStyle(state);

        return (
            <div
                className={ styles.root }
                style={moveStyle}
                ref={this._zoneRef}
                onMouseDown={this._onZoneMouseDown}
            >
                {children}
            </div>
        );
    }
}
