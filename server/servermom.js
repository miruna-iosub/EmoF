var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var url = require('url');
var registerController = require('./services/registerController');
var assetsController = require('./services/assetsController');
const mongodbConnect = require('../utils/database').mongodbConnect
var loginController = require('./services/loginController');
const userInfoController = require('./services/userInfoController');
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
        //loginController.handleRequest(request,response);

    //}
    userInfoController.handleRequest(request,response);
    assetsController.handleRequest(request,response);
    
});
