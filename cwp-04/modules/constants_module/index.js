constants = require('./constants');

module.exports = {
    host: constants.host,
    port: constants.port,
    connectionSocket: {
        host: constants.host,
        port: constants.port
    },
    encoding: constants.encoding,
    serverResOKstatus: constants.serverResOKstatus,
    serverResErrstatus: constants.serverResErrstatus,
    serverResEndstatus: constants.serverResEndstatus,
    filesConnectString: constants.filesConnectString,
    endFileTag: constants.endFileTag,
    sendNextFile: constants.sendNextFile,
    error: constants.error,
    copy: constants.copy,
    encode: constants.encode,
    decode: constants.decode,
}