const fs = require('fs');

module.exports.getStaticFile = function (fileName, response) {
    if (fileName == "") {
        fs.readFile('./public/index.html', function (err, data) {
            if (err) {
                response.writeHead(404);
                response.write("Not Found!");
            }
            else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data);
            }
            response.end();
        });
    } else {
        fs.readFile('./public/' + fileName, function (err, data) {
            if (err) {
                response.writeHead(404);
                response.write("Not Found!");
            }
            else {
                response.writeHead(200, { 'Content-Type': getContentType(fileName) });
                response.write(data);
            }
            response.end();
        });
    }
}

function getContentType(fileName) {
    let fileType = fileName.split('.')[1];
    switch (fileType) {
        case 'html':
            return 'text/html';
            break;
        case 'js':
            return 'application/javascript';
            break;
        case 'css':
            return 'text/css';
            break;
        case 'ico':
            return 'image/x-icon';
            break;
        default:
            break;
    }
}