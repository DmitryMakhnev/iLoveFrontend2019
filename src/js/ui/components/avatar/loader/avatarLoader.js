import React from 'react';

import styles from './avatarLoader.scss';
import classnames from 'classnames';
import { INPUT_FILE_SELECT_IMAGE_ACCEPT } from '../../../../libs/exif/imageUtils';

/**
 * @param {?string} className
 * @param {function(e)} onImageChange
 * @param {?string} imgSrc
 */
export const AvatarLoader = ({
    className,
    onImageChange,
    imgSrc,
    imgStyle,
}) => {
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
            <input type="file"
                   accept={ INPUT_FILE_SELECT_IMAGE_ACCEPT }
                   onChange={ onImageChange }
                   className={ styles.imageInput } />

            <If condition={ hasImage }>
                <img src={ imgSrc }
                     className={ styles.image }
                     style={ imgStyle }
                     alt="Your avatar" />
            </If>

            <If condition={ !hasImage }>
                <div className={ styles.imageStub }>Please add image</div>
            </If>
        </div>
    </div>
};

