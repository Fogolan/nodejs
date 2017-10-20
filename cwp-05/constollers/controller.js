const fs = require('fs');
const uuidv4 = require('uuid/v4');

class Controller {
    constructor(controllerUrl) {
        this.controllerUrl = controllerUrl;
        this.controllerMethod = [];
    }

    addHandlerToController(url, requestType, handler) {
        if(!this.handlers) {
            this.handlers = [];
        }

        this.handlers.push({
            url: url,
            requestType: requestType,
            handler: handler
        });
    }
}