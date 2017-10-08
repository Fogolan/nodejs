const fs = require('fs');
const path = require('path');

const constants = require('./modules/constants_module')

class Client {
    constructor(argv) {
        this.dirPathes = this.getDirectories(argv);
        this.getAllFilesNames(this.dirPathes);
    }

    getDirectories(argv) {
        var dirPathes = [];
        for (let i = 2; i < argv.length; i++) { 
            dirPathes.push(argv[i]);
        }
        return dirPathes;
    }

    response(data, client) {
        if(data === constants.serverResErrstatus) {
            console.log(data);
            client.destroy();
        }
        if(data === constants.serverResOKstatus) {
            console.log(data);
            this.sendFile(client);
        }
    }

    getAllFilesNames(dirPath) {
        this.filePathes = [];
        fs.readdirSync(dirPath).forEach(function(fileName) {
    
            let filePath = path.normalize(dirVal + '\\' + fileName);
            if (fs.statSync(filePath).isFile()) {
                this.filePathes.push(filePath);
            }
            else {
                readAllFilesNames(filePath);
            }
        })
    }

    sendFile(client) {
        if (this.filePathes.length != 0) {
    
            let tmpFileName = this.filePathes.shift();
    
            fs.readFile(tmpFileName, function(err, data) {
    
                client.write(data);
                client.write(bufferSep + path.basename(tmpFileName));
                client.write(bufferSep + endSendingFile);
    
            });
        } else {
            client.end();
        }
    }

}

module.exports = Client;