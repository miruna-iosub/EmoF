const http = require('http')
const { router } = require('./routes/router')
const postgresConnect = require('./utils/database').postgresConnect

const PORT = process.env.PORT || 3000;

postgresConnect(async () => {
    server.listen(PORT, () => console.log(`[server] Server running on port ${PORT}`))
})

const server = http.createServer((req, res) => {
    
    router(req, res)

})
/*const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
if (req.url === "/pages/index.html") {
    fs.readFile("./pages/index.html", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Error loading index.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  else if (req.url === "/pages/addaproduct.html") {
    fs.readFile("./pages/addaproduct.html", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Error loading addaproduct.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  else if (req.url === "/pages/myaccount.html") {
    fs.readFile("./pages/myaccount.html", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Error loading myaccount.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  else if (req.url === "/pages/signin.html") {
    fs.readFile("./pages/signin.html", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Error loading signin.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  else if (req.url === "/pages/signup.html") {
    fs.readFile("./pages/signup.html", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Error loading signup.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  else if (req.url === "/pages/sendfeedback-loggedin.html") {
    fs.readFile("./pages/signup.html", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Error loading signup.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  else if (req.url === "/pages/sendfeedback-unlogged.html") {
    fs.readFile("./pages/signup.html", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Error loading signup.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
   else {
    res.writeHead(404);
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
*/