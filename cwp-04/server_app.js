const net = require('net');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const constants = require('./modules/constants_module');
const Server = require('./server');

let clients = [];
let maxClientsCount = 5;

let clientManager = new Server(maxClientsCount);

let server = net.createServer(function (client) {
    client.on('data', responseFromClient);
    client.on('error', errorFromClient);

    function responseFromClient(data, error) {
        let response = clientManager.request(data, client);
        if(response) {
            client.write(response);
        }
    }

    function errorFromClient(error) {
        console.log(error);
    }
});

server.listen(constants.port, constants.host, function () {
    console.log('server started');
});