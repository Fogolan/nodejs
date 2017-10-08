const uuidv4 = require('uuid/v4');

const constants = require('./modules/constants_module');

class Server {
    constructor(maxNumberOfClients) {
        this.clients = [];
        this.maxClients = maxNumberOfClients;
    }

    request(data, client) {
        if(client.id != undefined) {
            return;
        }
        let result = this.checkInitMessage(data, client);
        return result;
    }

    checkInitMessage(data, client) {
        if (data.toString() == constants.filesConnectString) {
            let result = this.tryConnectClient(client);
            if(result === true) {
                return constants.serverResOKstatus;
            }
        } else {
            return constants.serverResErrstatus;
        }
    }

    tryConnectClient(client) {
        if(this.clients.length < this.maxClients) {
            client.id = uuidv4();
            this.clients.push(client);
            return true;
        }
        return false;
    }
}

module.exports = Server;