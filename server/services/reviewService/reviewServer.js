const http = require("http");
var controller = require("./reviewController.js");
const mongodbConnect = require('../../../utils/database.js').mongodbConnect

mongodbConnect(async () => {
    server.listen(3004, () => console.log(`[server] Server running on port ${3004}`))
})

const server = http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Access-Control-Allow-Credentials', true);

    const reqURL = request.url;
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
                console.log(reqURL);
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