
var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var url = require('url');
var registerController = require('./registerController');

var serverPort = 8052;
http.createServer(function (request, response) {
    
    var path = url.parse(request.url).pathname;
    userInfoController.handleRequest(request,response);
    

}).listen(serverPort);
console.log('Server running at localhost:' + serverPort);
