const constants = require('./modules/constants_module')

class Client {
    constructor(argv) {
        this.filePathes = this.readCMDParams(argv);
    }

    readCMDParams(argv) {
        var filePathes = [];
        for (let i = 2; i < argv.length; i++) { 
            filePathes.push(argv[i]);
        }
        return filePathes;
    }

    response(data, client) {
        if(data === constants.serverResErrstatus) {
            console.log(data);
            client.destroy();
        }
        if(data === constants.serverResOKstatus) {
            console.log(data);
        }
    }

}

module.exports = Client;