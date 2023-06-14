const http = require('http')
const {router} = require('./routes/router')
const mongodbConnect = require('./utils/database').mongodbConnect
const fs = require('fs');
const controller = require("./controllers/assetsController");
require("dotenv").config();

function handleRequest(request, response) {

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
//
// if (request.url === '/loggedin.css') {
//     response.writeHead(200, {
//         'Content-Type': 'text/css'
//     });
//
//     fs.readFile('./src/assets/css/loggedin.css', null, function (error, data) {
//         if (error) {
//             response.writeHead(404);
//             response.write('Whoops! File not found!');
//         } else {
//             response.write(data);
//         }
//         response.end();
//     });
// }
// else {
//     response.writeHead(200, {
//     'Content-Type': 'text/html'
// });
//     fs.readFile('./src/html/index.html', null, function (error, data) {
//         if (error) {
//             response.writeHead(404);
//             response.write('Whoops! File not found!');
//         } else {
//             response.write(data);
//         }
//         response.end();
//     });
// }

mongodbConnect(async () => {
    server.listen(4000, () => console.log(`[server] Server running on port ${4000}`))
})

const server = http.createServer((req, res) => {
    handleRequest(req,res);
    //router(req, res);
  });
  