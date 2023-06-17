const { fileRouter } = require("./filesRoute");
const controller = require("../controllers/assetsController");

const fs = require("fs");

function renderHTML(object, response) {
  object = object.toString().substring(object.toString().lastIndexOf("/"));
  fs.readFile("./src/html" + object, function (error, htmlContent) {
    if (error) {
      response.writeHead(404);

      response.write("Couldn't load HTML / not found");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(htmlContent);
    }
    response.end();
  });
}
function renderCSS(path, response) {
  fs.readFile("./src" + path, function (error, cssContent) {
    if (error) {
      response.writeHead(404);
      response.write("Couldn't load CSS / not found");
    } else {
      response.writeHead(200, { "Content-Type": "text/css" });
      response.write(cssContent);
    }
    response.end();
  });
}

function renderImage(path, response) {
  fs.readFile("./src" + path, function (error, image) {
    if (error) {
      response.writeHead(404);
      response.write("Couldn't load Image / not found");
    } else {
      console.log("Success at reading image");
      response.writeHead(200, { "Content-Type": "image/x-icon" });
      response.write(image);
    }
    response.end();
  });
}

async function router(request, response) {
  const cookie = request.headers.cookie;

  /*if (request.url === '/' ) {
        console.log("[router] public route", request.url)
        fs.readFile('./src/html/index.html', function (error, data) {
            if(error){
                console.log(error)
            }
            response.writeHead(200, {"Content-Type":"text/html"});
            response.end();
        });
    } */
  if (request.url === "/") {
    if(cookie){
        fs.readFile("./src/html/homepage-loggedin.html", null, function (error, data) {
            if (error) {
              response.writeHead(404);
              response.write("Whoops! File not found!");
            } else {
              response.write(data);
            }
            response.end();
          });
    }
    else{
        fileRouter(request, response);
    }
  } else if (request.url === "/login") {
    if (cookie) {
      fs.readFile("./src/html/myaccount.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    } else {
      fs.readFile("./src/html/signin.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    }
  } else if (request.url === "/account") {
    if (cookie) {
      fs.readFile("./src/html/myaccount.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    } else {
      fs.readFile("./src/html/index.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    }
  } else if (request.url === "/register") {
    if (cookie) {
      fs.readFile("./src/html/myaccount.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    } else {
      fs.readFile("./src/html/signup.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    } 
} else if (request.url === "/all/productsunlogged") {
    if (cookie) {
      fs.readFile("./src/html/products-logged.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    } else {
      fs.readFile("./src/html/products-unlogged.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    }
  } else if (request.url === "/service/productsunlogged" || request.url === "/person/productsunlogged" || request.url === "/product/productsunlogged" || request.url === "/artisticArtefact/productsunlogged" || request.url === "/geographicalPlace/productsunlogged") {
    if (cookie) {
      fs.readFile("./src/html/products-unlogged.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    } else {
      fs.readFile("./src/html/products-logged.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    }
  } else if (request.url === "/service/productslogged" || request.url === "/person/productslogged" || request.url === "/product/productslogged" || request.url === "/artisticArtefact/productslogged" || request.url === "/geographicalPlace/productslogged") {
    if (cookie) {
      fs.readFile("./src/html/products-logged.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    } else {
      fs.readFile("./src/html/index.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    }
  } else if (request.url === "/addproduct") {
    if (cookie) {
      fs.readFile("./src/html/addaproduct.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    } else {
      fs.readFile("./src/html/index.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    } 
  } else if (request.url === "/homepage") {
    if (cookie) {
      fs.readFile("./src/html/homepage-loggedin.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    } else {
      fs.readFile("./src/html/index.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    } 
  } else if (request.url === "all/productslogged") {
    if (cookie) {
      fs.readFile("./src/html/products-logged.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    } else {
      fs.readFile("./src/html/products-unlogged.html", null, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("Whoops! File not found!");
        } else {
          response.write(data);
        }
        response.end();
      });
    } 
  } else if (request.url.substring(request.url.length - 4) === ".css") {
    controller.renderCSS(request.url, response);
  } else if (request.url.substring(request.url.length - 5) === ".html") {
    controller.renderHTML(request.url, response);
  } else if (request.url.substring(request.url.length - 3) === ".js") {
    controller.renderJavascript(request.url, response);
  } else if (request.url.slice(request.url.length - 4) === ".png") {
    controller.renderImage(request.url, response);
  } else if (request.url.substring(request.url.length - 3) === ".js") {
    controller.renderImage(request.url, response);
  } else {
    console.log("[router] 404 error Page Not Found");
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Page not found" }));
  }
}

module.exports = {
  router,
};
