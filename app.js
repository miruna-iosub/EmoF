const http = require('http')
const {router} = require('./routes/router')
const mongodbConnect = require('./utils/database').mongodbConnect
const fs = require('fs');
const controller = require("./controllers/assetsController");
require("dotenv").config();

function handleRequest(request, response) {

    const reqURL = request.url;
    const reqMethod = request.method;

    if (reqURL.toString().includes(".css")) {
        controller.renderCSS(reqURL, response);
    } else if (reqURL.toString().includes(".html")) {
        controller.renderHTML(reqURL, response);
    } else if (reqURL.toString().includes(".js")) {
        controller.renderJavascript(reqURL, response);
    } else if (reqURL.toString().includes(".png")) {
        controller.renderImage(reqURL, response);
    } else if (reqURL.toString().includes(".esm")) {
        controller.renderEms(reqURL, response);
    } else {
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

const server = http.createServer(function (req, res) {
    router(req, res, req.url, req.method);
});
