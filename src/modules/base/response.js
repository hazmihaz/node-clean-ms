class Response {
    constructor(status, message, error, data, paging) {
        this.status = status
        this.data = data
        this.paging = paging
        this.message = message
        this.error = error
    }
}

export default Response
