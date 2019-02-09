import React from 'react';

import styles from './withOrientationExample.scss';
import { withViewModelInjection } from '../../../../libs/mobx/withViewModel';
import { WithOrientationExampleViewModel } from './withOrientationExampleViewModel';
import { AvatarLoader } from '../../avatar/loader/avatarLoader';


const withOrientationExampleHOC = withViewModelInjection(WithOrientationExampleViewModel);


export const WithOrientationExample = withOrientationExampleHOC(
    /**
     * @param {WithOrientationExampleViewModel} viewModel
     */
    ({
        viewModel,
    }) => {
        return <div className={ styles.root }>
            <AvatarLoader className={ styles.avatarLoader }
                          imgSrc={ viewModel.imgSrc }
                          onImageChange={ viewModel.onImageChange }
                          imgStyle={ viewModel.imgCustomStyle } />
            <If condition={ viewModel.orientation }>
                <div className={ styles.orientation }> EXIF Orientation: <span className={ styles.orientationValue }>{ viewModel.orientation }</span> </div>
            </If>
        </div>;
    }
);

