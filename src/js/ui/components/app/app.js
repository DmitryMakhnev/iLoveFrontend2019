import React from 'react';
import { observer } from 'mobx-react';
import { inject } from 'diii';
import { AppView, AppViewModel } from './appViewModel';

import styles from './app.scss';
import { ExamplesMenu } from '../examples/menu/examplesMenu';
import { JustImageExample } from '../examples/justImage/justImageExample';
import { WithOrientationExample } from '../examples/withOrientation/withOrientationExample';


export const App = observer(() => {
    const appViewModel = /** @type {AppViewModel} */ inject(AppViewModel);
    const activeAppView = appViewModel.activeAppView;

    return <div className={ styles.root } onDoubleClick={ appViewModel.inc }>
        <ExamplesMenu activeAppView={ activeAppView }
                      onViewSelect={ appViewModel.showView } />
        <div className={ styles.content }>
            <Choose>
                <When condition={ activeAppView === AppView.JUST_IMAGE }>
                    <JustImageExample />
                </When>
                <When condition={ activeAppView === AppView.WITH_ORIENTATION }>
                    <WithOrientationExample />
                </When>
                <Otherwise>
                    You made mistake in demo. Just kill yourself
                </Otherwise>
            </Choose>
        </div>
    </div>;
});


