var url = require('url');
var fs = require('fs');

function renderHTML(object, response){

        fs.readFile("./src/html"+object, function (error, htmlContent) {
            if (error) {
                response.writeHead(404);

                response.write("Couldn't load HTML / not found");
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' })
                response.write(htmlContent);
            }
            response.end();
        });

}
function renderCSS(path, response) {
    fs.readFile( "./src"+path, function (error, cssContent) {
        console.log(path);
        if (error) {
            response.writeHead(404);
            response.write("Couldn't load CSS / not found");
        } else {
            response.writeHead(200, { 'Content-Type': 'text/css' })
            response.write(cssContent);
        }
        response.end();
    });
}

function renderImage(path, response) {
    fs.readFile("./src"+ path, function (error, image) {
        if (error) {
            response.writeHead(404);
            response.write("Couldn't load Image / not found");
        } else {
            console.log('Success at reading image');
            response.writeHead(200, {'Content-Type': 'image/x-icon'})
            response.write(image);
        }
        response.end();
    });
}

function renderJavascript(path, response) {
    fs.readFile("./src" + path, function (error, jafile) {
        if (error) {
            response.writeHead(404);
            response.write("Couldn't load JS / not found");
        } else {
            console.log('Success at reading image');
            response.writeHead(200, {'Content-Type': 'text/javascript'})
            response.write(jafile);
        }
        response.end();
    });
}
function defaultHandler(response){
    response.writeHead(404);
    response.write("No rendering file found.");
    response.end();

}
    // var file = fs.createReadStream("../src/assets" + path);
    // file.on('open', function () {
    //     response.setHeader('Content-Type', 'image/png');
    //     file.pipe(response);
    // });
    // response.sendfile("../src/assets"+path);


module.exports = {renderCSS,renderImage,renderHTML, defaultHandler,renderJavascript}