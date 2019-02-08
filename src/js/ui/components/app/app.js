import React from 'react';
import { observer } from 'mobx-react';
import { inject } from 'diii';
import { AppView, AppViewModel } from './appViewModel';

import styles from './app.scss';
import { ExamplesMenu } from '../examplesMenu/examplesMenu';


export const App = observer(() => {
    const appViewModel = /** @type {AppViewModel} */ inject(AppViewModel);
    const activeAppView = appViewModel.activeAppView;

    return <div className={ styles.root }>
        <ExamplesMenu activeAppView={ activeAppView }
                      onViewSelect={ appViewModel.showView } />
        <Choose>
            <When condition={ activeAppView === AppView.JUST_IMAGE }>
                just image
            </When>
            <When condition={ activeAppView === AppView.WITH_ORIENTATION }>
                with orientation
            </When>
            <Otherwise>
                something goes wrong
            </Otherwise>
        </Choose>
    </div>;
});


