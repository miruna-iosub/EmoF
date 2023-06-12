const http = require("http");
var controller = require("./services/registerController1.js");
const mongodbConnect = require('../utils/database.js').mongodbConnect

mongodbConnect(async () => {
    server.listen(3002, () => console.log(`[server] Server running on port ${3002}`))
})

const server = http.createServer((request, response) => {
    const reqURL = request.url;
    const reqMethod = request.method;
    
    switch (reqMethod) { 
        case "POST": {
            if (reqURL === "/register") {
                controller.postHandler(request, response);
            }
            break;
        }
        default: {
            controller.defaultHandler(request, response)
            break;
        }

    }
});

/*var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var url = require('url');
var assetsController = require('./services/assetsController');
const mongodbConnect = require('../utils/database').mongodbConnect
var loginController = require('./services/loginController');
const formsController = require('./services/formsController');
require("dotenv").config();



var serverPort = 8024;

mongodbConnect(async () => {
    server.listen(serverPort, () => console.log('Server running at localhost:' + serverPort))
})

const server = http.createServer(function (request, response) {
    
    var path = url.parse(request.url).pathname;

   // if (path === '/register'){
        //registerController.handleRequest(request,response);

   // }
    //else 
    //if (path === '/login'){
    loginController.handleRequest(request,response);

    //}
   // userInfoController.handleRequest(request,response);
    assetsController.handleRequest(request,response);
    formsController.handleRequest(request,response);
});
*/

/*var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var url = require('url');
var registerController = require('./services/registerController');

var serverPort = 8051;
http.createServer(function (request, response) {
    
    var path = url.parse(request.url).pathname;
    //if (path.startsWith('/register')){
        registerController.handleRequest(request,response);
    //}

}).listen(serverPort);
console.log('Server running at localhost:' + serverPort);
*/