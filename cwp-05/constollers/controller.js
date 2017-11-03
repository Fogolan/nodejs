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

    addHandlersToController(handlers) {
        if(!this.handlers) {
            this.handlers = [];
        }

        handlers.forEach(function(handler) {
            this.handlers.push({
                requestType: handler.requestType,
                handler: handler.handler,
                paramsCount: handler.paramsCount,
            });
        }, this);
    }
}

module.exports = Controller;