const net = require('net');
const fs = require('fs');

const constants = require('./modules/constants_module');
const Client = require('./client');

let clientManager = new Client(process.argv[2], process.argv[3]);
let client = new net.Socket();

client.setEncoding(constants.encoding);

client.connect(constants.connectionSocket, function() {
    client.write(constants.filesConnectString);
})

client.on('data', function(data) {
    let request = clientManager.response(data, client);
    if(request) {
        client.write(request);
    }
})

client.on('error', function(data) {
    console.log(data.toString());
})

