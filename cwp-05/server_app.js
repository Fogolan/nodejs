const http = require('http');
const fs = require('fs');
const urlHelper = require('url');

const constants = require('./modules/constants_module');
const ArticleController = require('./constollers/articleController');
const RootMechanism = require('./constollers/rootMechanism');

let controllers = [new ArticleController(),];
let rootMechanism = new RootMechanism(controllers);

http.createServer(function (request, response) {
    
    let paramArray = [];
    let queryObject = {};
    let url = request.url;
    if (request.method == 'GET') {
        queryObject = urlHelper.parse(url, true).query;
        url = urlHelper.parse(url, true).pathname;
        processRequest(url, request.method, queryObject, response);
    } else {
        let post = '';

        request.on('data', function (chunk) {
            post += chunk;
        });

        request.on('end', function () {
            if (post !== "") {
                try {
                    paramArray.push(JSON.parse(post));
                    processRequest(url, request.method, paramArray, response);
                } catch (e) {
                    console.log('invalid body');
                }
            }
        });
    }
}).listen(constants.port);

function processRequest(url, requestType, queryObject, response) {
    let paramArray = Object.keys(queryObject).map(function (key) { return queryObject[key]; });
    let handler = rootMechanism.getHandler(url, requestType, paramArray.length);
    if (handler) {
        let responseData = handler(queryObject);
        response.statusCode = '200';
        response.write(JSON.stringify(responseData));
    }
    else {
        response.statusCode = '404';
        response.write('404 not found');
    }
    response.end();
}