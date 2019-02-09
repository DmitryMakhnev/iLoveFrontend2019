import React, { Component, createRef } from 'react';

import styles from './avatarLoader.scss';
import classnames from 'classnames';
import { INPUT_FILE_SELECT_IMAGE_ACCEPT } from '../../../../libs/exif/imageUtils';


export class AvatarLoader extends Component {

    boundsDetectorRef = createRef();

    _imgRef= createRef();
    get imgRef() {
        return this.props.imgRef || this._imgRef;
    }

    state = {
        imgStyles: {
            maxWidth: '0',
            maxHeight: '0',
        },
        isReadyForImgDrawing: false,
    };

    getImageSize() {
        const imageElement = this.imgRef.current;
        return {
            width: imageElement.offsetWidth,
            height: imageElement.offsetHeight,
        };
    }

    notifyAboutImageSizeChange = () => {
        if (this.props.onImageSizeChange && this.imgRef.current) {
            const imageSize = this.getImageSize();
            this.props.onImageSizeChange(imageSize);
        }
    };

    calcCurrentBounds = () => {
        const boundsDetector = this.boundsDetectorRef.current;
        if (boundsDetector) {
            this.setState(
                {
                    imgStyles: {
                        maxWidth: boundsDetector.clientWidth + 'px',
                        maxHeight: boundsDetector.clientHeight + 'px',
                    },
                    isReadyForImgDrawing: true,
                },
                this.notifyAboutImageSizeChange
            );
        }
    };

    _imageOnLoad = () => {
        this.notifyAboutImageSizeChange();
        if (this.props.onImageLoad) {
            this.props.onImageLoad();
        }
    };

    componentDidMount() {
        window.addEventListener('resize', this.calcCurrentBounds);
        this.calcCurrentBounds();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.calcCurrentBounds);
    }

    render() {
        const {
            className,
            onImageChange,
            imgSrc,
            imgStyle,
            imgRef,
            imageElements,
        } = this.props;

        const stateImgStyles = this.state.imgStyles;
        const isReadyForImgDrawing = this.state.isReadyForImgDrawing;

        const hasImage = imgSrc !== null;

        return <div className={ classnames(
            styles.root,
            className
        ) }>
            <div className={ classnames(
                    styles.imageView,
                    {
                        [styles.__hasNotImage]: !hasImage
                    }
                ) }>
                <div ref={ this.boundsDetectorRef } className={ styles.imageViewInner } />

                <If condition={ isReadyForImgDrawing && hasImage }>
                    <div className={ styles.imageWrapper }>
                        <img src={ imgSrc }
                             ref={ imgRef }
                             onLoad={ this._imageOnLoad }
                             className={ styles.image }
                             style={ {
                                 ...imgStyle,
                                 ...stateImgStyles,
                             } }
                             alt="Your avatar" />
                        { imageElements }
                     </div>
                </If>

                <If condition={ !hasImage }>
                    <div className={ styles.imageStub }>Please add image</div>
                </If>

                <input type="file"
                       accept={ INPUT_FILE_SELECT_IMAGE_ACCEPT }
                       onChange={ onImageChange }
                       className={ styles.imageInput } />
            </div>
        </div>
    }

}

