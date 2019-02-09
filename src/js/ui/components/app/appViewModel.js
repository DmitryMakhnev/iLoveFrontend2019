import { registerInjection } from 'diii';
import { action, observable } from 'mobx';


/**
 * @enum
 */
export const AppView = {
    JUST_IMAGE: 'JUST_IMAGE',
    WITH_ORIENTATION: 'WITH_ORIENTATION',
};


@registerInjection
export class AppViewModel {

    @observable
    activeAppView = AppView.JUST_IMAGE;

    /**
     * @param {!AppView} appView
     * @return {AppViewModel}
     */
    @action.bound
    showView(appView) {
        this.activeAppView = appView;
        return this;
    }


}

