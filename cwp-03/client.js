const fs = require('fs');
const path = require('path');

const constants = require('./modules/constants_module')

class Client {

    constructor(argv) {
        this.argv = argv;
    }

    response(data, client) {
        if(data === constants.serverResErrstatus) {
            console.log(data);
            client.destroy();
        }
        if(data === constants.serverResOKstatus) {
            console.log(data);
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