const http = require("http");
var controller = require("./duedateController.js");
const mongodbConnect = require('./database/database.js').mongodbConnect

mongodbConnect(async () => {
    server.listen(3007, () => console.log(`[server] Server running on port ${3007}`))
})

const server = http.createServer((request, response) => {
    const reqURL = request.url;
    const reqMethod = request.method;


    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, access-control-allow-credentials');
    console.log(request.method)

    switch (reqMethod) {
        case "PATCH": {
            if (reqURL === "/api/v1/duedate") {
                controller.dateHandler(request, response);
            }
        }
        case "OPTIONS": {
            if (reqURL === "/api/v1/duedate") {
                controller.dateHandler(request, response);
            }
        }
    }
});