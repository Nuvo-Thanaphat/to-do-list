export class FetchError extends Error {
    /**
     * Constructs a new FetchError.
     * @param {string} message - The error message.
     * @param {number} status - The HTTP status code.
     */
    constructor(message, status) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }
}
