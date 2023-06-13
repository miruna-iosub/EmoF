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
    const reqURL = request.url;
    const reqMethod = request.method;
    switch (reqMethod) {
        case "POST": {
            if (reqURL === "/products") {
                controller.postHandler(request, response);
            }
            break;
        }
        case "GET": {
            if (reqURL === "/products") {
                controller.getHandler(request, response, "all", null);
            }
            else if (reqURL.slice(0, 9) === "/products") {
                controller.getHandler(request, response, "idorcategory", reqURL.slice(10));
            }
            break;
        }
        default: {
            controller.defaultHandler(request, response)
            break;
        }

    }
});



