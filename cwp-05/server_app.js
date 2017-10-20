const http = require('http');
const fs = require('fs');

const constants = require('./modules/constants_module');
const ArticleController = require('./constollers/articleController');
const RootMechanism = require('./constollers/rootMechanism');

let controllers = [new ArticleController(),];
let rootMechanism = new RootMechanism(controllers);


http.createServer(function(request, response){
    
//    console.log("Url: " + request.url);
//    console.log("Тип запроса: " + request.method);
//    console.log("User-Agent: " + request.headers["user-agent"]);
//    console.log("Все заголовки");
//    console.log(request.headers);

    let handler = rootMechanism.getHandler(request.url, request.method);

    console.log(handler);
    
   response.end();
}).listen(constants.port);