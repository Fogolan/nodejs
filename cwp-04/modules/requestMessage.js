class RequestMessage{
    
    constructor(requestType, filePath, key) {
        this.requestType = requestType;
        this.filePath = filePath;
        this.key = key;
    }
}

module.exports = RequestMessage;