const net = require('net');
const fs = require('fs');

const constants = require('./modules/constants_module');
const Client = require('./client');

let clientManager = new Client(process.argv);
let client = new net.Socket();

client.setEncoding(constants.encoding);

client.connect(constants.connectionSocket, function() {
    client.write(constants.filesConnectString);
})

client.on('data', function(data) {
    clientManager.response(data, client);
})

client.on('error', function(data) {
    console.log(data.toString());
})

