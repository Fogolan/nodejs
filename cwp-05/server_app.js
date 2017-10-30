const http = require('http');
const fs = require('fs');

const constants = require('./modules/constants_module');
const ArticleController = require('./constollers/articleController');
const RootMechanism = require('./constollers/rootMechanism');

let controllers = [new ArticleController(),];
let rootMechanism = new RootMechanism(controllers);

http.createServer(function (request, response) {
    
    let paramArray = [];
    let url = request.url;
    if (request.method == 'GET') {
        let params = request.url.split('?');
        console.log('params', params);
        if (params) {
            url = params[0];
            params = params[1];
            if (params) {
                let index = params.indexOf('&');
                console.log('index', index);
                if (index !== -1) {
                    params = params.split('&');
                    console.log('split params &', params);
                    params.forEach(function (param) {
                        let parameter = param.split('=');
                        if (parameter[1]) {
                            console.log(parameter[1]);
                            paramArray.push(parameter[1]);
                        }
                    })
                } else {
                    let parameter = params.split('=');
                    if (parameter[1]) {
                        console.log(parameter[1]);
                        paramArray.push(parameter[1]);
                    }
                }
            }
        }
        processRequest(url, request.method, paramArray, response);
    } else {
        let post = '';

        request.on('data', function (chunk) {
            post += chunk;
        });

        request.on('end', function () {
            if (post !== "") {
                try {
                    console.log('request body: ', post);
                    paramArray.push(JSON.parse(post));
                    processRequest(url, request.method, paramArray, response);
                } catch (e) {
                    console.log('invalid body');
                }
            }
        });
    }
}).listen(constants.port);

function processRequest(url, requestType, paramArray, response) {
    console.log(paramArray.length);
    let handler = rootMechanism.getHandler(url, requestType, paramArray.length);
    if (handler) {
        let responseData = handler(paramArray);
        response.statusCode = '200';
        console.log('responseData: ', JSON.stringify(responseData));
        response.write(JSON.stringify(responseData));
    }
    else {
        console.log('404 not found');
        response.statusCode = '404';
        response.write('404 not found');
    }
    response.end();
}