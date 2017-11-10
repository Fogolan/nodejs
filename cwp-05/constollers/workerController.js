const Controller = require('./controller');
const constants = require('../modules/constants_module');
const errors = require('../content/responses.json');

class WorkerController extends Controller {
    constructor() {
        super(constants.workerControllerUrl);
        super.addHandlersToController(this.getControllersMethods());
    }

    getControllersMethods() {
        return [
            {
                requestType: "GET",
                handler: this.getWorkers,
                paramsCount: 0,
            },
            {
                requestType: "GET",
                handler: this.getWorker,
                paramsCount: 0,
            },
            {
                requestType: "POST",
                handler: this.addWorker,
                paramsCount: 1,
            },
            {
                requestType: "PUT",
                handler: this.removeWorker,
                paramsCount: 1,
            }
        ]
    }

    getWorkers() {

    }

    getWorker(paramsObject) {

    }

    addWorker(paramsObject) {

    }

    removeWorker(paramsObject) {

    }
}