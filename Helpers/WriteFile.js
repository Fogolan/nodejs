const fs = require('fs');

exports.writeFile = function writeFile(films) {
        fs.writeFile('top250.json', JSON.stringify(films, null, '\t'), function (err) {
            if (err) console.log(err);
        });
} 