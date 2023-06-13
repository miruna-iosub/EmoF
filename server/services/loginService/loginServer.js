const http = require("http");
var controller = require("./loginController.js");
const mongodbConnect = require('../../../utils/database.js').mongodbConnect

mongodbConnect(async () => {
    server.listen(3002, () => console.log(`[server] Server running on port ${3002}`))
})

const server = http.createServer((request, response) => {
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