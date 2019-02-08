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

    @observable
    test = 1;

    @action.bound
    inc() {
        this.test += 1;
    }

    @observable
    test2 = 1;

    @action.bound
    inc2() {
        this.test2 += 1;
    }

    constructor() {
        setInterval(this.inc2, 500);
    }

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

