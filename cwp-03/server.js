const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const JSON = require ('serialize-json');

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

    createFileFromBinData(id, fileName) {
        let fileData = Buffer.concat(this.filesChanks[id]);
        fs.writeFile(__dirname + path.sep + 'recievedFiles' + path.sep + fileName, fileData, function (err) {
            if (err)
            console.error(err);
            return false;
            }
        );
        this.filesChanks[id]=[];
        return true;
    }

    ClientDialogFILES(data, client) {
        let fileObject = JSON.decode(data);
        let bufferChank = Buffer.from(fileObject.fileBuffer);
        if(!this.filesChanks[client.id]) {
            this.filesChanks[client.id] = [];            
        }

        this.filesChanks[client.id].push(bufferChank);        
        
        return this.createFileFromBinData(client.id, fileObject.fileName);
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