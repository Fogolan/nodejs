const net = require('net');
const fs = require('fs');
const constants = require('./constants');

let client = new net.Socket();

client.setEncoding(constants.encoding);

client.connect(constants.connectionSocket, function() {
    client.write(constants.filesConnectString);
})

client.on('data', function(data) {
    console.log(data.toString());
})

client.on('error', function(data) {
    console.log(data.toString());
})