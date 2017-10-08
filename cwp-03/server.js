const net = require('net');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const constants = require('./modules/constants_module');

let clients = [];

let server = net.createServer(function (client) {
    client.on('data', initStringFromClient);
    client.on('error', errorFromClient);

    function initStringFromClient(data, error) {
        if(client.id != undefined) {
            return;
        }
        if (data.toString() == constants.filesConnectString) {
            client.id = uuidv4();
            client.write(constants.serverResOKstatus);
        } else {
            client.write(constants.serverResErrstatus);
        }
    }

    function errorFromClient(error) {
        console.log(error);
    }
});

server.listen(constants.port, constants.host, function () {
    console.log('server started');
});