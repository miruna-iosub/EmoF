const http = require("http");

var controller = require("./controller/controller");
//var connection = require("./database/connection.js");
const mongodbConnect = require('./database/database').mongodbConnect

mongodbConnect(async () => {
    server.listen(3005, () => console.log(`[server] Server running on port ${3005}`))
})


const server = http.createServer((request, response) => {
    const reqURL = request.url;
    const reqMethod = request.method;
    switch (reqMethod) {
        case "GET": {
            if (reqURL.slice(0,11) === "/statistics") {
                controller.defaultHandlerStats(request, response,reqURL);
            }

            else { controller.defaultHandler(request, response); }

            break;
        }
        default: {
            controller.defaultHandler(request, response);
            break;
        }

    }
});



