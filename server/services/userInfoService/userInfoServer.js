const http = require("http");
var controller = require("./userInfoController.js");
const mongodbConnect = require('../../../utils/database.js').mongodbConnect

mongodbConnect(async () => {
    server.listen(3006, () => console.log(`[server] Server running on port ${3006}`))
})

const server = http.createServer((request, response) => {
    const reqURL = request.url;
    const reqMethod = request.method;

    
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, access-control-allow-credentials');
     
    
    switch (reqMethod) { 
        case "GET": {
            if (reqURL ==="/get-api-user" ) {
                controller.getHandler(request, response)
            }
            break;
        }
        case "PATCH": {
            if (reqURL === "/updateinfo") {
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
