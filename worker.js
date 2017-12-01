const fs = require('fs');

let path = process.argv[2];
let interval = process.argv[3] * 1000;
let numbers = [];
if (!fs.existsSync(path)) {
    fs.writeFile(path, '[]', (err) => {
        if (err) console.error(err);
    });
}
setInterval(function () {
    fs.readFile(path, function (err, data) {
        let json = JSON.parse(data);
        let number = Math.floor(Math.random() * (100 - 1)) + 1;
        numbers.push(number);
        json.push(number);
        console.log(number);
        fs.writeFile(path, JSON.stringify(json), (err) => {
            if (err)
                console.error(err);
        });
    });
}, interval);










