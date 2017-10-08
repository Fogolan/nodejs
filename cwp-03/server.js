const net = require('net');
const fs = require('fs');
const constants = require('./constants');

let clients = [];

let server = net.createServer(function (client) {
    client.on('data', readFromClient);

    function readFromClient(data, error) {
        console.log(data.toString());
        if (data.toString() == constants.filesConnectString) {
            client.write(constants.serverResOKstatus);
        } else {
            client.write(constants.serverResErrstatus);
        }
    }
});

server.listen(constants.port, constants.host, function () {
    console.log('server started');
});