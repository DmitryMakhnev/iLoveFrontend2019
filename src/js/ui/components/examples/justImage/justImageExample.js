import React from 'react';

import styles from './justImageExample.scss';
import { JustImageExampleViewModel } from './justImageExampleViewModel';
import { withViewModelInjection } from '../../../../libs/mobx/withViewModel';


const justImageExampleHOC = withViewModelInjection(JustImageExampleViewModel);

export const JustImageExample = justImageExampleHOC(
    /**
     * @param {JustImageExampleViewModel} viewModel
     */
    ({
        viewModel,
    }) => {
        return <div className={ styles.root } onClick={ viewModel.inc }>
            { viewModel.result }
        </div>
    }
);

