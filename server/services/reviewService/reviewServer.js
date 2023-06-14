const http = require("http");
var controller = require("./reviewController.js");
const mongodbConnect = require('../../../utils/database.js').mongodbConnect

mongodbConnect(async () => {
    server.listen(3004, () => console.log(`[server] Server running on port ${3004}`))
})

const server = http.createServer((request, response) => {

    const reqURL = request.url;
    const reqMethod = request.method;
    switch (reqMethod) {
        case "POST": {
            if (reqURL === "/save-review") {
                controller.postHandler(request, response);
            }
            break;
        }
        case "GET": {
            console.log(reqURL.toString().substring(1,reqURL.toString().lastIndexOf("/")));
            console.log(reqURL.toString().substring(reqURL.toString().lastIndexOf("/")+1));
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