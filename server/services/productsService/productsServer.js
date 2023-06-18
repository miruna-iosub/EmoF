const http = require("http");
var controller = require("./controller/controller.js");
//var connection = require("./database/connection.js");
const mongodbConnect = require('./database/database').mongodbConnect

mongodbConnect(async () => {
    server.listen(3003, () => console.log(`[server] Server running on port ${3003}`))
})

//   console.log("Server is running on port 3002");
//});

const server = http.createServer((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, access-control-allow-credentials');


    const reqURL = request.url.slice(7);
    const reqMethod = request.method;
    switch (reqMethod) {
        case "POST": {
            if (reqURL === "/products") {
                controller.postHandler(request, response);
            }
            break;
        }
        case "GET": {

            console.log(reqURL)
            if (reqURL === "/products/all") {
                controller.getHandler(request, response, "all", "all");
            }
            else if (reqURL === "/products/homepage") {
                controller.getHandler(request, response, "homepage", null);
            }
            else if (reqURL.slice(0, 19) === "/products/category/") {
                controller.getHandler(request, response, "formfields", reqURL.slice(19));
            }
            else if (reqURL=== "/products/user") {
                controller.getHandlerAuth(request, response);
            }
            else if (reqURL.slice(0, 9) === "/products") {
                controller.getHandler(request, response, "idorcategory", reqURL.slice(10));
            }
            break;
        }

        case "PATCH":{
            if (reqURL.slice(0,16)=== "/products/status") {
                controller.patchHandlerAuth(request, response,reqURL.slice(17));
            }

        }
        case "DELETE":{
            if (reqURL.substring(0,9)=== "/products") {
                controller.deleteHandlerAuth(request, response,reqURL.substring(10,reqURL.length));
            }
            break;
        }
        default: {
            controller.defaultHandler(request, response)
            break;
        }

    }
});



