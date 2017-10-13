const fs = require('fs');
const path = require('path');
const JSON = require ('serialize-json');

const constants = require('./modules/constants_module')
const RequestMessage = require('./modules/requestMessage');

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
            return this.getRequest(this.argv);
        }
    }

    commandExecuted() {
        
    }

    getRequest(argv) {
        let request = new RequestMessage(this.requestType, this.filePath);
        return JSON.encode(request);
    }

}

module.exports = Client;