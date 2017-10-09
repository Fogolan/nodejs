const host = "127.0.0.1";
const port = 3001;
const encoding = 'utf8';
const serverResOKstatus = 'ACK';
const serverResErrstatus = 'DEC';
const filesConnectString = 'FILES';
const endFileTag = "ENDFILETAG";
const sendNextFile = 'NEXTFILE';
const error = 'ERROR';
const fileSeparator = '||||';

module.exports = {
    host: host,
    port: port,
    connectionSocket: {
        host: host,
        port: port
    },
    serverResOKstatus: serverResOKstatus,
    serverResErrstatus: serverResErrstatus,
    filesConnectString: filesConnectString,
    endFileTag: endFileTag,
    sendNextFile: sendNextFile,
    error: error,
    endFileTag: endFileTag,
    fileSeparator: fileSeparator,
    encoding, encoding
}