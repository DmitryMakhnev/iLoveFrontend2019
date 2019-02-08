

export class ExtendedError extends Error {
    /**
     * @param {number} code
     * @param {string} message
     * @param {*} [extra]
     */
    constructor(code, message, extra = null) {
        super(message);
        this.code = code;
        this.extra = extra;
    }
}

