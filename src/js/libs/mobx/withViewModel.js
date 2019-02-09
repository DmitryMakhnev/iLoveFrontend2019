import { Component, createFactory } from 'react';
import { observer } from 'mobx-react';
import { inject } from 'diii';
import { action } from 'mobx';


/**
 * @param {function():Object} viewModelFactory
 * @return {function(IReactComponent): IReactComponent}
 */
export const withViewModel = viewModelFactory => BaseComponent =>
    class BaseComponentWithViewModel extends Component {
        _viewModel = viewModelFactory();
        _baseComponent = createFactory(observer(BaseComponent));

        _lastProps;

        _receivePropsToViewModel(props) {
            this._lastProps = props;
            if (this._viewModel.receiveNewProps) {
                this._viewModel.receiveNewProps(props);
            }
        }

        constructor(props) {
            super(props);
            if (this._viewModel.receiveNewProps) {
                this.shouldComponentUpdate = function(nextProps) {
                    this._receivePropsToViewModel(nextProps);
                    return true;
                };
                this._receivePropsToViewModel(props);
            }
        }

        render() {
            const baseComponentProps = this._lastProps;

            const props = {
                ...baseComponentProps,
                viewModel: this._viewModel,
            };

            return this._baseComponent({ ...props });
        }
    };

/**
 * @param {Class|function} viewModelClass
 * @return {function(IReactComponent): IReactComponent}
 */
export const withViewModelInjection = viewModelClass => withViewModel(() => inject(viewModelClass));


const receiveNewProps = action(function(newProps) {
    const receivedPropsMapping = this.__receivedPropsMapping;
    Object.keys(receivedPropsMapping)
        .forEach(key => {
            this[key] = newProps[this.__receivedPropsMapping[key]];
        });
});


const settingUpReceivable = (instance, fieldName, propName) => {
    if (!instance.__receivedPropsMapping) {
        instance.__receivedPropsMapping = {};
        instance.receiveNewProps = receiveNewProps;
    }

    instance.__receivedPropsMapping[fieldName] = propName;
};


export const receivable = (instance, fieldName) => {
    settingUpReceivable(instance, fieldName, fieldName);
};

receivable.from = propName => (instance, fieldName) => {
    settingUpReceivable(instance, fieldName, propName);
};