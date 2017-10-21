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
            let result = this.findMethod(controllerName, requestType);
            console.log('this.result: ', result);
            return result;
        }
    }

    findMethod(controllerName, requestType) {
        let result;
        console.log('handlers: ', this.handlers);
        this.handlers.forEach(function(handler) {
            if(handler.controllerUrl === controllerName) {
                handler.methodHandlers.forEach(function(method) {
                    console.log('method: ', method);
                    if(method.requestType === requestType) {
                        console.log('I execute methodHandler: ', method.handler());
                        result = method.handler;
                        console.log('I return method: ', result);
                        return false;
                    }
                })
            }
        });
        return result;
    }
}

module.exports = RootMechanism;