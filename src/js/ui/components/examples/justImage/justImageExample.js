import React from 'react';

import styles from './justImageExample.scss';
import { JustImageExampleViewModel } from './justImageExampleViewModel';
import { withViewModelInjection } from '../../../../libs/mobx/withViewModel';
import { AvatarLoader } from '../../avatar/loader/avatarLoader';


const justImageExampleHOC = withViewModelInjection(JustImageExampleViewModel);

export const JustImageExample = justImageExampleHOC(
    /**
     * @param {JustImageExampleViewModel} viewModel
     */
    ({
        viewModel,
    }) => {
        return <div className={ styles.root }>
            <AvatarLoader className={ styles.avatarLoader }
                          imgSrc={ viewModel.imgSrc }
                          onImageChange={ viewModel.onImageChange } />
        </div>
    }
);

