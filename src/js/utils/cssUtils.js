/**
 * @param {number} value
 * @return {string}
 */
export const prepareStylesPropValue = value => {
    if (value !== 0) {
        return value + 'px';
    }
    return '0';
};
