const fs = require('fs');
const uuidv4 = require('uuid/v4');

class Controller {
    constructor(controllerUrl) {
        this.controllerUrl = controllerUrl;
        this.controllerMethod = [];
    }

    addHandlerToController(requestType, handler, paramsCount) {
        if(!this.handlers) {
            this.handlers = [];
        }

        this.handlers.push({
            requestType: requestType,
            handler: handler,
            paramsCount: paramsCount,
        });
    }
}

module.exports = Controller;