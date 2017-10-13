const host = "127.0.0.1";
const port = 3001;
const encoding = 'utf8';
const serverResOKstatus = 'ACK';
const serverResErrstatus = 'DEC';
const filesConnectString = 'REMOTE';
const sendNextFile = 'NEXTFILE';
const error = 'ERROR';

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
    sendNextFile: sendNextFile,
    error: error,
    encoding, encoding
}