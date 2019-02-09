// checking from https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
let passiveSupported = false;
try {
    const options = Object.defineProperty({}, 'passive', {
        get: function() {
            passiveSupported = true;
        },
    });

    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, options);
} catch (err) {
    passiveSupported = false;
}

/**
 * @param {EventListenerOptions|boolean} options
 * @return {EventListenerOptions|boolean}
 */
function prepareThirdParameter(options) {
    if (!passiveSupported && typeof options !== 'boolean') {
        return options.capture;
    }
    return options;
}

/**
 * @param {!HTMLElement} element
 * @param {!string} eventName
 * @param {EventListenerOrEventListenerObject} eventListener
 * @param {EventListenerOptions} options
 */
export function addEventListenerShim(element, eventName, eventListener, options) {
    element.addEventListener(eventName, eventListener, prepareThirdParameter(options));
}

/**
 * @param {!HTMLElement} element
 * @param {!string} eventName
 * @param {EventListenerOrEventListenerObject} eventListener
 * @param {EventListenerOptions} options
 */
export function removeEventListenerShim(element, eventName, eventListener, options) {
    element.removeEventListener(eventName, eventListener, options);
}
