const http = require("http");
var controller = require("./loginController.js");
const mongodbConnect = require('../../../utils/database.js').mongodbConnect

mongodbConnect(async () => {
    server.listen(3002, () => console.log(`[server] Server running on port ${3002}`))
})

const server = http.createServer((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, access-control-allow-credentials');

    const reqURL = request.url;
    const reqMethod = request.method;
    switch (reqMethod) {
        case "POST": {
            if (reqURL === "/login") {
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