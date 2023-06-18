const http = require("http");
var controller = require("./reviewController.js");
const mongodbConnect = require('./database/database.js').mongodbConnect

mongodbConnect(async () => {
    server.listen(3004, () => console.log(`[server] Server running on port ${3004}`))
})

const server = http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Access-Control-Allow-Credentials', true);

    const reqURL = request.url.substring(7);
    const reqMethod = request.method;
    switch (reqMethod) {


        case "POST": {
            if (reqURL === "/review") {
                controller.postHandler(request, response);
            }
            break;
        }
        case "GET": {
            if (reqURL.toString().substring(1,reqURL.toString().lastIndexOf("/")) === "sendReview") {
                controller.getHandler(request, response,reqURL.toString().substring(reqURL.toString().lastIndexOf("/")+1), null);
            }
            break;
        }
        default: {
            controller.defaultHandler(request, response)
            break;
        }

    }
});