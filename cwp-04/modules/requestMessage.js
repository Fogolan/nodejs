class RequestMessage{
    constructor(requestType, filePath) {
        this.requestType = requestType;
        this.filePath = filePath;
    }
}

module.exports = RequestMessage;