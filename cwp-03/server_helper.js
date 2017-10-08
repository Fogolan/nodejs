const uuidv4 = require('uuid/v4');

const constants = require('./modules/constants_module')

module.exports = {
    checkInitMessage: checkInitMessage
}

function checkInitMessage(data, client) {
    if (data.toString() == constants.filesConnectString) {
        client.id = uuidv4();
        return constants.serverResOKstatus;
    } else {
        return constants.serverResErrstatus;
    }
}
