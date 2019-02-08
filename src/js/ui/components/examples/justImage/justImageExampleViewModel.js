import { registerInjection } from 'diii';
import { action, computed, observable } from 'mobx';
import { receivable } from '../../../../libs/mobx/withViewModel';



@registerInjection
export class JustImageExampleViewModel {

    @observable
    counter = 1;

    @action.bound
    inc() {
        this.counter += 1;
    }

    @observable
    @receivable.from('from')
    test = null;

    @computed
    get result() {
        return `c: ${this.counter} / t: ${this.test}`;
    }

}

