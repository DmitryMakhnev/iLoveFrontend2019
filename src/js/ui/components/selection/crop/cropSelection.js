import React from 'react';


import styles from './cropSelection.scss';
import classnames from 'classnames';
import { RESIZE_CORNER_DATA_ATTRIBUTE, ResizeCornerId } from '../container/selectionContainer';


export const CropSelection = () =>
    <div className={ styles.root }>
        <div
            className={classnames(styles.point, styles.__topLeft)}
            {...{
                [RESIZE_CORNER_DATA_ATTRIBUTE]: ResizeCornerId.TOP_LEFT,
            }}
        />
        <div
            className={classnames(styles.point, styles.__topRight)}
            {...{
                [RESIZE_CORNER_DATA_ATTRIBUTE]: ResizeCornerId.TOP_RIGHT,
            }}
        />
        <div
            className={classnames(styles.point, styles.__bottomLeft)}
            {...{
                [RESIZE_CORNER_DATA_ATTRIBUTE]: ResizeCornerId.BOTTOM_LEFT,
            }}
        />
        <div
            className={classnames(styles.point, styles.__bottomRight)}
            {...{
                [RESIZE_CORNER_DATA_ATTRIBUTE]: ResizeCornerId.BOTTOM_RIGHT,
            }}
        />
    </div>;

