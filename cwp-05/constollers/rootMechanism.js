const constants = require('../modules/constants_module');

class RootMechanism {

    constructor(controllers) {
        this.controllers = controllers;
        this.setControllersHandlers(this.controllers);
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
            console.log('controllerHandler: ', controllerHandler);

            this.handlers.push(controllerHandler);

        }, this);
    }

    getHandler(url, requestType) {
        if(url.startsWith(constants.baseUrl)) {
            let controllerName = url.substr(constants.baseUrl.length);
            console.log('controller name: ', controllerName);
            return this.findMethod(controllerName, requestType);
        }
    }

    findMethod(controllerName, requestType) {
        console.log('handlers: ', this.handlers);
        this.handlers.forEach(function(handler) {
            if(handler.controllerUrl === controllerName) {
                handler.methodHandlers.forEach(function(method) {
                    console.log('method: ', method);
                    if(method.requestType === requestType) {
                        console.log('I return methodHandler: ', method.handler);
                        return method.handler;
                    }
                })
            }
        });
    }
}

module.exports = RootMechanism;