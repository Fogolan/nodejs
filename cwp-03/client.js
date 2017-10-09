const fs = require('fs');
const path = require('path');

const constants = require('./modules/constants_module')

class Client {

    constructor(argv) {
        this.filePathes = [];
        this.argv = argv;
    }

    response(data, client) {
        console.log(data);
        if(data === constants.serverResErrstatus) { //It needs to strategy pattern implementation but it's just node.js I will not do this
            client.destroy();
        }
        if(data === constants.serverResOKstatus) {
            console.log('I am starting to send files');
            this.getDirectories(this.argv);
            this.sendFile(client);
        }
    }

    getAllFilesNames(dirPath, fileNamesArray) { //I don't know why but I need to get this.filePhathes from function parameters because it can't see it other ways
        fs.readdirSync(dirPath).forEach(function(fileName) {
            let filePath = path.normalize(dirPath + '\\' + fileName);
            if (fs.statSync(filePath).isFile()) {
                fileNamesArray.push(filePath);
            }
            else {
                this.getAllFilesNames(filePath);
            }
        })
    }

    getDirectories(directories) {
        directories.forEach((element) => {
            this.getAllFilesNames(element, this.filePathes);
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