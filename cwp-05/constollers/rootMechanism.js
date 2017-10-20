const constants = require('../modules/constants_module');

class rootMechanism {

    constructor(controllers) {
        this.controllers = controllers;
    }

    setControllersHandlers(controllers) {
        this.handlers = [];

        controllers.forEach(function(controller) {
            if(!controller) {
                return;
            }

            let controllerHandler = {
                controllerUrl: controller.controllerUrl,
                methodHandlers: controller.handlers
            }

            this.handlers.push(controllerHandler);

        }, this);
    }

    getHandler(url, requestType) {
        if(url.startWith(constants.baseUrl)) {
            let controllerName = url.substr(1);
            let methodName = url.substr(2);
        }
    }

    findMethod(controllerName, methodName, requestType) {
        this.handlers.forEach(function(handler) {
            if(handler.controllerUrl === controllerName) {
                handler.methodHandlers.forEach(function(method) {
                    if(method.url === methodName && method.requestType === requestType) {
                        return method.handler;
                    }
                })
            }
        });
    }
}