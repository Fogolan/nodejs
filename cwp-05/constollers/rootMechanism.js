const constants = require('../modules/constants_module');

class RootMechanism {

    constructor(controllers) {
        this.controllers = controllers;
        this.setControllersHandlers(this.controllers);
    }

    setControllersHandlers(controllers) {
        this.handlers = [];

        controllers.forEach(function (controller) {
            if (!controller) {
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

    getHandler(url, requestType, paramsCount) {
        console.log('url: ', url);
        if (url.startsWith(constants.baseUrl)) {
            let controllerName = url.substr(constants.baseUrl.length);
            console.log('controller name: ', controllerName);
            let result = this.findMethod(controllerName, requestType, paramsCount);
            console.log('result: ', result);
            return result;
        }
    }

    findMethod(controllerName, requestType, paramsCount) {
        let result;
        console.log('handlers: ', this.handlers);
        this.handlers.forEach(function (handler) {
            console.log('handler: ', handler);
            if (handler.controllerUrl === controllerName) {
                handler.methodHandlers.forEach(function (method) {
                    console.log('method: ', method);
                    if (method.requestType === requestType) {
                        if (method.paramsCount == paramsCount) {
                            result = method.handler;
                            console.log('I return method: ', result);
                            return false;
                        }
                    }
                })
            }
        });
        return result;
    }
}

module.exports = RootMechanism;