const fs = require('fs');
const path = require('path');

const constants = require('./modules/constants_module')

class Client {

    constructor(argv) {
        this.argv = argv;
    }

    response(data, client) {
        console.log(data);
        if(data === constants.serverResErrstatus) { //It needs to strategy pattern implementation but it's just node.js I will not do this
            client.destroy();
        }
        if(data === constants.serverResOKstatus) {
            this.getDirectories(this.argv)
            this.sendFile(client);
        }
    }

    getAllFilesNames(dirPath) {
        let filePathes = [];
        fs.readdirSync(dirPath).forEach(function(fileName) {
            let filePath = path.normalize(dirPath + '\\' + fileName);
            if (fs.statSync(filePath).isFile()) {
                filePathes.push(filePath);
            }
            else {
                this.getAllFilesNames(filePath);
            }
        })
    }

    getDirectories(directories) {
        directories.forEach((element) => {
            this.getAllFilesNames(element);
        });
    }

    sendFile(client) {
        console.log('filePathes: ', this.filePathes);
        if (this.filePathes && this.filePathes.length !== 0) {
    
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