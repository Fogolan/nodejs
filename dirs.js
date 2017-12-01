const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"));

const dirs = [
    'dir-1/dir-1-1',
    'dir-1/dir-1-2',
    'dir-1/dir-1-2/dir-1-2-1',
    'dir-2/dir-2-1/dir-2-1-1',
    'dir-2/dir-2-2/dir-2-2-1',
    'dir-2/dir-2-1/dir-2-2-2/dir-2-2-2-1',
    'dir-3',
    'dir-3/dir-3-1',
    'dir-3/dir-3-2/dir-3-2-1',
    'dir-3/dir-3-3/dir-3-3-1'
];

Promise.mapSeries(dirs, (dirName) =>{
    return dirName.split('/');
}).then((val) =>{
    for (let paths of val) {
        let basesPath = './TEST/';
        for (let path of paths) {
            basesPath += path + '/';
            fs.mkdirAsync(basesPath);
        }
    }
});