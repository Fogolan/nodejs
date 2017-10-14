const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const JSON = require('serialize-json');
const crypto = require('crypto');

const constants = require('./modules/constants_module');

const recievedFilesFolder = "recievedFiles";

class Server {
    constructor(maxNumberOfClients) {
        this.clients = [];
        this.maxClients = maxNumberOfClients;
    }

    request(data, client) {
        console.log('from client: ', data.toString());
        if (client.id != undefined) {
            return this.executeRequest(data, client);
        }
        return this.checkInitMessage(data, client);
    }

    executeRequest(data, client) {
        let requestObject = JSON.decode(data);
        console.log('get command ', requestObject.requestType);
        switch (requestObject.requestType) {
            case constants.copy:
                return this.copyRequestCommand(client.id, requestObject.filePath);
                break;
            case constants.decode:
                return this.decodeRequestCommand(client.id, requestObject.filePath, requestObject.key);
                break;
            case constants.encode:
                return this.encodeRequestCommand(client.id, requestObject.filePath, requestObject.key);
                break;
            default:
                return constants.error;
        }
    }

    getFilePathPattern(clientId, fileName) {
        let pathPattern = __dirname + path.sep + clientId.toString() + path.sep;
        if (!fs.existsSync(pathPattern)) { //I don't know why but nodejs doesn't want to create directory with file just only directory
            fs.mkdirSync(pathPattern);
        }
        return pathPattern + fileName;
    }

    copyRequestCommand(clientId, filePath) {
        console.log('current filePath: ', filePath);
        var newFilePath = this.getFilePathPattern(clientId, path.basename(filePath));
        this.createFileWithStream(filePath, newFilePath);

        return constants.serverResEndstatus;
    }

    decodeRequestCommand(clientId, filePath, key) {
        var newFilePath = __dirname + path.sep + recievedFilesFolder + path.sep + clientId + '_' + path.basename(filePath);
        console.log("decode key ", key);
        let result = this.createFileWithStream(filePath, newFilePath, crypto.createDecipher(constants.encodeAlgorithm, key));
        return result;
    }

    encodeRequestCommand(clientId, filePath, key) {
        var newFilePath = __dirname + path.sep + recievedFilesFolder + path.sep + clientId + '_' + path.basename(filePath);
        console.log("encode key ", key);
        let result = this.createFileWithStream(filePath, newFilePath, crypto.createCipher(constants.encodeAlgorithm, key));
        return result;
    }

    createFileWithStream(filePath, newFilePath, transformStream) {
        try {
            let readableStream = fs.createReadStream(filePath, constants.encoding);
            let writeableStream = fs.createWriteStream(newFilePath);
            if (transformStream) {
                readableStream.pipe(transformStream).pipe(writeableStream);
            } else {
                readableStream.pipe(writeableStream);
            }
            return constants.serverResEndstatus;
        }
        catch (err) {
            return constants.error;
        }
    }

    createFileFromBinData(clientId, fileName, fileBuffer) {
        fs.writeFile(this.getFilePathPattern(clientId, fileName), fileBuffer, function (err) {
            if (err)
                console.error(err);
            return false;
        }
        );
        return true;
    }

    ClientDialogFILES(data, client) {
        let fileObject = JSON.decode(data);
        let bufferChank = Buffer.from(fileObject.fileBuffer);

        return (this.createFileFromBinData(client.id, fileObject.fileName, fileObject.fileBuffer)) ? constants.sendNextFile : constants.error;
    }

    checkInitMessage(data, client) {
        if (data.toString() == constants.filesConnectString) {
            let result = this.tryConnectClient(client);
            if (result === true) {
                return constants.serverResOKstatus;
            }
        } else {
            return constants.serverResErrstatus;
        }
    }

    tryConnectClient(client) {
        if (this.clients.length < this.maxClients) {
            client.id = uuidv4();
            console.log('new client: ', client.id);
            this.clients.push(client);
            return true;
        }
        return false;
    }
}

module.exports = Server;