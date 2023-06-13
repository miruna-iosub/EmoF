const http = require("http");
var controller = require("./services/registerController.js");
const mongodbConnect = require('../utils/database.js').mongodbConnect

mongodbConnect(async () => {
    server.listen(3001, () => console.log(`[server] Server running on port ${3001}`))
})

const server = http.createServer((request, response) => {
    const reqURL = request.url;
    const reqMethod = request.method;
    
    switch (reqMethod) { 
        case "POST": {
            if (reqURL === "/register") {
                controller.postHandler(request, response)
            }
            break;
        } 
        case "GET": {
            if(reqURL === '/get-users') {
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