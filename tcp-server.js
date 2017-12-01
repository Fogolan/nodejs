/**
 * Created by Anna on 23.10.2017.
 */
const { exec } = require('child_process');
const cp = require("child_process");
const fs = require('fs');
const net = require('net');
const terminate = require('terminate');
const { spawn } = require('child_process');


const tcp = 5000;
let workers = [];
const handlers = {
    'show': getWorkers,
    'add': addWorker,
    'remove': removeWorker
};

const server = net.createServer(client => {
    try {
        client.setEncoding('utf8');
        client.once('data', data => {
            const handler = getHandler((JSON.parse(data)).action);
            handler(client, JSON.parse(data));
        });
        client.on('end', () => {
            console.log('end');
        });
    } catch (err) {
        console.error(err);
    }
});

server.listen(tcp, () => {
    console.log(`Server listening on localhost:${tcp}`);
});

function addWorker(client, data) {
    let id = Date.now();
    let path = `files/${id}.json`;
    let interval = data.interval;
    console.log(interval);
    let day = new Date();
    let startedOn = day.toLocaleDateString() + ' ' + day.toLocaleTimeString();
    let worker = spawn('node', ['worker.js', `${path}`, `${interval}`]);
    let obj = {
        id: id,
        startedOn: startedOn,
        path: path,
        process: worker
    };
    let toClient = {
        id: id,
        startedOn: startedOn,
    }
    workers.push(obj);
    client.write(JSON.stringify(toClient));
    client.destroy();
}

function getWorkers(client, data) {

    let list = [];
    for (let i in workers) {
        fs.readFile(workers[i].path, (err, num) => {
            list.push({ id: workers[i].id, startedOn: workers[i].startedOn, numbers: JSON.parse(num) });
            if (list.length === workers.length) {
                client.write(JSON.stringify(list));
            }
        });

    }

}



function removeWorker(client, data) {
    for (let i in workers) {
        if (workers[i].id === data.id) {
            fs.readFile(workers[i].path, (err, num) => {
                let remWork = {
                    id: workers[i].id,
                    numbers: JSON.parse(num),
                    startedOn: workers[i].startedOn
                };

                client.write(JSON.stringify(remWork));
                workers[i].process.kill();
                workers.splice(i, 1);

            });

        }

    }
    // client.destroy();
}


function getHandler(url) {
    return handlers[url] || notFound;
}

function notFound(client, data) {
    client.destroy();
}
