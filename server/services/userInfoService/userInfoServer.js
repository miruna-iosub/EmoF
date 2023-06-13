const http = require("http");
var controller = require("./userInfoController.js");
const mongodbConnect = require('../../../utils/database.js').mongodbConnect

mongodbConnect(async () => {
    server.listen(3006, () => console.log(`[server] Server running on port ${3006}`))
})

const server = http.createServer((request, response) => {
    const reqURL = request.url;
    const reqMethod = request.method;
    
    switch (reqMethod) { 
        case "GET": {
            if (reqURL ==="/get-api-user" ) {
                controller.getHandler(request, response)
            }
            break;
        }
        case "PATCH": {
            if (reqURL === "/edit-user") {
                controller.patchHandler(request, response);
            }
            break;
        }
        default: {
            controller.defaultHandler(request, response)
            break;
        }

    }
});
