const net = require('net');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const constants = require('./modules/constants_module');
const Server = require('./server');

let clients = [];

let clientManager = new Server(5);

let server = net.createServer(function (client) {
    client.on('data', initStringFromClient);
    client.on('error', errorFromClient);

    function initStringFromClient(data, error) {
        client.write(clientManager.request(data, client));
    }

    function errorFromClient(error) {
        console.log(error);
    }
});

server.listen(constants.port, constants.host, function () {
    console.log('server started');
});