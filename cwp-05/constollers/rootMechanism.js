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

            this.handlers.push(controllerHandler);

        }, this);
    }

    getHandler(url, requestType, paramsCount) {
        if (url.startsWith(constants.baseUrl)) {
            let controllerName = url.substr(constants.baseUrl.length);
            let result = this.findMethod(controllerName, requestType, paramsCount);
            return result;
        }
    }

    findMethod(controllerName, requestType, paramsCount) {
        let result;
        this.handlers.forEach(function (handler) {
            if (handler.controllerUrl === controllerName) {
                handler.methodHandlers.forEach(function (method) {
                    if (method.requestType === requestType) {
                        if (method.paramsCount <= paramsCount) {
                            result = method.handler;
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