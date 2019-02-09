import React from 'react';

import styles from './justImageExample.scss';
import { JustImageExampleViewModel } from './justImageExampleViewModel';
import { withViewModelInjection } from '../../../../libs/mobx/withViewModel';
import { INPUT_FILE_SELECT_IMAGE_ACCEPT } from '../../../../libs/exif/imageUtils';
import classnames from 'classnames';


const justImageExampleHOC = withViewModelInjection(JustImageExampleViewModel);

export const JustImageExample = justImageExampleHOC(
    /**
     * @param {JustImageExampleViewModel} viewModel
     */
    ({
        viewModel,
    }) => {
        const hasImage = viewModel.imgSrc !== null;

        return <div className={ styles.root }>
            <div className={ styles.imageWrapper }>
                <div className={ classnames(
                    styles.imageView,
                    {
                        [styles.__hasNotImage]: !hasImage
                    }
                ) }>
                    <input type="file"
                           accept={ INPUT_FILE_SELECT_IMAGE_ACCEPT }
                           onChange={ viewModel.onImageChange }
                           className={ styles.imageInput } />

                    <If condition={ hasImage }>
                        <img src={ viewModel.imgSrc }
                             className={ styles.image }
                             alt="avatar" />
                    </If>

                    <If condition={ !hasImage }>
                        <div className={ styles.imageStub }>Please add image</div>
                    </If>
                </div>
            </div>
        </div>
    }
);

