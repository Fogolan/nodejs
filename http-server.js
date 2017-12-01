const http = require('http');
const net = require('net');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 4000;
const tcp = 5000;

const handlers = {
    '/workers/': getWorkers,
    '/workers/add': addWorker,
    '/workers/remove': removeWorker
};

const server = http.createServer((req, res) => {
    parseBodyJson(req, (err, payload) => {
        console.log(payload);
        res.setHeader('Content-Type', 'application/json');
        const handler = getHandler(req.url);
        handler(req, res, payload, (err, result) => {
            if (err) {
                res.statusCode = err.code;
                res.end(JSON.stringify(err));

            }
            else {
                console.log(result);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            }

        });
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);

});

function getWorkers(req, res, payload, cb) {
    toTcpServer({ action: 'show' }, cb);
}

function addWorker(req, res, payload, cb) {
    toTcpServer({ action: 'add', interval: payload.interval }, cb);
}

function removeWorker(req, res, payload, cb) {
    toTcpServer({ action: 'remove', id: payload.id }, cb);
}

function toTcpServer(data, cb) {
    const client = new net.Socket();
    client.setEncoding('utf8');
    client.connect(tcp, function () {
        console.log('Connected');
        client.write(JSON.stringify(data));
        client.once('data', function (data) {
            cb(null, JSON.parse(data));

        });
    });

    client.on('close', function () {
        console.log('Connection closed');
    });

}


function getHandler(url) {
    return handlers[url] || notFound;
}

function notFound(req, res, payload, cb) {
    cb({ code: 404, message: 'Not found' });
}

function parseBodyJson(req, cb) {
    let body = [];
    req.on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();
        if (body !== "") {
            let params = JSON.parse(body);
            cb(null, params);
        }
        else {
            cb(null, '');
        }
    });
}



