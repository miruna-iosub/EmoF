/*var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var url = require('url');
var registerController = require('./registerController');
const mongodbConnect = require('./database').mongodbConnect


var serverPort = 8024;

mongodbConnect(async () => {
    server.listen(serverPort, () => console.log('Server running at localhost:' + serverPort))
})

const server = http.createServer(function (request, response) {
    
    var path = url.parse(request.url).pathname;
    if (path.startsWith('/register')){
        registerController.handleRequest(request,response);
    }    
});*/
var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var url = require('url');
var registerController = require('./registerController');

var serverPort = 8051;
http.createServer(function (request, response) {
    
    var path = url.parse(request.url).pathname;
    //if (path.startsWith('/register')){
        registerController.handleRequest(request,response);
    //}

}).listen(serverPort);
console.log('Server running at localhost:' + serverPort);
