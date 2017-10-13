const fs = require('fs');
const path = require('path');
const JSON = require ('serialize-json');

const constants = require('./modules/constants_module')
const RequestMessage = require('./modules/requestMessage');

const key = "j5kdFJK3dfjKJDf";

class Client {

    constructor(requestType, filePath) {
        this.requestType = requestType;
        this.filePath = filePath;
    }

    response(data, client) {
        console.log(data);
        if(data === constants.serverResErrstatus) { //It needs to strategy pattern implementation but it's just node.js I will not do this
            client.destroy();
        }

        if(data === constants.serverResEndstatus) {
            client.destroy();
        }

        if(data === constants.serverResOKstatus) {
            console.log('I am starting to send request');
            return this.getRequest();
        }
    }

    getRequest() {
        let requestObject = this.createRequestObject();
        
        return JSON.encode(requestObject);
    }

    createRequestObject() {
        if(this.requestType === constants.copy) {
            return new RequestMessage(this.requestType, this.filePath);
        }
        return new RequestMessage(this.requestType, this.filePath, key);
    }

}

module.exports = Client;