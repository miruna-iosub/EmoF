const http = require("http");
var controller = require("./registerController.js");
const mongodbConnect = require('../../../utils/database.js').mongodbConnect

mongodbConnect(async () => {
    server.listen(3001, () => console.log(`[server] Server running on port ${3001}`))
})

const server = http.createServer((request, response) => {
    const reqURL = request.url;
    const reqMethod = request.method;
    
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Access-Control-Allow-Credentials', true);
    
    switch (reqMethod) { 
        case "POST": {
            if (reqURL === "/api/register") {
                controller.postHandler(request, response)
            }
            break;
        } 
        case "GET": {
            if(reqURL === '/api/users') {
                controller.getHandlerAll(request, response)
            }
            else if (reqURL.match(/^\/get-user\/([0-9a-z]{24})$/) ) {
                console.log(reqURL)
                const id = reqURL.split('/')[2]
                console.log(id)
                controller.getHandler(request, response, id)
            }
            break;
        }
        default: {
            controller.defaultHandler(request, response)
            break;
        }

    }
}); 