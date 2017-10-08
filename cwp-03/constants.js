const host = "127.0.0.1";
const port = 3001;
const encoding = 'utf8';
const serverResOKstatus = 'ACK';
const serverResErrstatus = 'DEC';
const filesConnectString = 'FILES';

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
}