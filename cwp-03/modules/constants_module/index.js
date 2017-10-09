constants = require('./constants');

module.exports = {
    host: constants.host,
    port: constants.port,
    connectionSocket: {
        host: constants.host,
        port: constants.port
    },
    serverResOKstatus: constants.serverResOKstatus,
    serverResErrstatus: constants.serverResErrstatus,
    filesConnectString: constants.filesConnectString,
    endFileTag: constants.endFileTag,
    sendNextFile: constants.sendNextFile,
    error: constants.error,
    endFileTag: constants.endFileTag,
}