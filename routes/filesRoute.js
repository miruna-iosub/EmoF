const { fileHandling } = require('../controllers/fileController')
var sanitize = require('mongo-sanitize')
const controller = require("../controllers/assetsController");
const fs = require('fs');

async function fileRouter(request, response) {

    const reqURL = request.url;
    console.log(reqURL);
    const reqMethod = request.method;

    if (reqURL.substring( reqURL.length-4) === ".css") {
        controller.renderCSS(reqURL, response);
    } else if (reqURL.substring(reqURL.length - 5) === ".html") {
        controller.renderHTML(reqURL, response);
    } else if (reqURL.substring(reqURL.length - 3) === ".js") {
        controller.renderJavascript(reqURL, response);
    } else if (reqURL.slice(reqURL.length - 4) === ".png") {
        controller.renderImage(reqURL, response);
    } else if (reqURL.substring(reqURL.length - 3) === ".js") {
        controller.renderImage(reqURL, response);
    }else {

        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.readFile('./src/html/index.html', null, function (error, data) {
            if (error) {
                response.writeHead(404);
                response.write('Whoops! File not found!');
            } else {
                response.write(data);
            }
            response.end();
        });
    }
}

module.exports = {
    fileRouter
}