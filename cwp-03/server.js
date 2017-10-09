const uuidv4 = require('uuid/v4');

const constants = require('./modules/constants_module');

class Server {
    constructor(maxNumberOfClients) {
        this.clients = [];
        this.filesChanks = [];
        this.maxClients = maxNumberOfClients;
    }

    request(data, client) {
        console.log('from client: ', data.toString());
        if(client.id != undefined) {
            let result = (this.ClientDialogFILES(data, client)) ? constants.sendNextFile : constants.error;
            console.log(result);
            return result;
        }
        let result = this.checkInitMessage(data, client);
        return result;
    }

    ClientDialogFILES(data, client) {
        let bufferChank = Buffer.from(data);
        this.filesChanks[client.id] = bufferChank;

        if (data.toString().endsWith(constants.endFileTag)) {
            createFileFromBinData(client.id);
            return true;
        }
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
            console.log('new client: ', client.id);
            this.clients.push(client);
            return true;
        }
        return false;
    }
}

module.exports = Server;