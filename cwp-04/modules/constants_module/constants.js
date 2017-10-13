const host = "127.0.0.1";
const port = 3001;
const encoding = 'utf8';
const serverResOKstatus = 'ACK';
const serverResErrstatus = 'DEC';
const serverResEndstatus = "END";
const filesConnectString = 'REMOTE';
const sendNextFile = 'NEXTFILE';
const error = 'ERROR';
const copy = "COPY";
const encode = "ENCODE";
const decode = "DECODE";

module.exports = {
    host: host,
    port: port,
    connectionSocket: {
        host: host,
        port: port
    },
    serverResOKstatus: serverResOKstatus,
    serverResErrstatus: serverResErrstatus,
    serverResEndstatus: serverResEndstatus,
    filesConnectString: filesConnectString,
    sendNextFile: sendNextFile,
    error: error,
    encoding, encoding,
    copy: copy,
    encode: encode,
    decode: decode,
}