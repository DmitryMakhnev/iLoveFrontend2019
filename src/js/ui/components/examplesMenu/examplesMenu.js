import React from 'react';
import classnames from 'classnames';


import styles from './examplesMenu.scss';
import { AppView } from '../app/appViewModel';


/**
 * @param {!AppView} activeAppView
 * @param {!function(!AppView)} onViewSelect
 * @return {ReactNode}
 */
export const ExamplesMenu = ({
    activeAppView,
    onViewSelect
}) => <div className={ styles.root }>
    {
        Object
            .values(AppView)
            .map(
                /**
                 * @param {!AppView} appView
                 * @return {ReactNode}
                 */
                appView =>
                    <a href="javascript:void(0)"
                       key={ appView }
                       className={ classnames(
                           styles.item,
                           activeAppView === appView ? '__active' : ''
                       ) }
                       onClick={ () => onViewSelect(appView) }>
                        { appView }
                    </a>
                )
    }
</div>;
