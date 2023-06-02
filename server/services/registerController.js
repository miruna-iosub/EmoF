var url = require("url");
var fs = require("fs");
var qs = require("querystring");
const randomstring = require("randomstring");
const { getPostData } = require("../../utils/utils");
const User = require("../../models/usersModel");
const getDb = require("../../utils/database").getDb;

const bcrypt = require("bcrypt");


function renderHTML(path, response) {
  console.log(__dirname + "aici e renderhtml reg contr");
  fs.readFile(
    __dirname + "/../../../src/html/" + path,
    function (error, htmlContent) {
      if (error) {
        response.writeHead(404);

        response.write("Couldn't load HTML / not found");
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(htmlContent);
      }
      response.end();
    }
  );
}

function renderNotFoundHTML(response) {
  console.log(__dirname);
  fs.readFile(
    __dirname + "/../../../src/html/pageNotFound.html",
    function (error, htmlContent) {
      if (error) {
        response.writeHead(404);

        response.write("Couldn't load HTML / not found");
      } else {
        console.log("ERROR");
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(htmlContent);
      }
      response.end();
    }
  );
}

function parseFormData(formDataString) {
  const formData = {};
  const pairs = formDataString.split("&");

  for (const pair of pairs) {
    const [key, value] = pair.split("=");
    const decodedKey = decodeURIComponent(key);
    const decodedValue = decodeURIComponent(value);
    formData[decodedKey] = decodedValue;
  }

  return formData;
}

function parseFormValues(formDataString) {
  const formData = parseFormData(formDataString);

  const { username, email, age, occupation, password, repeat_password } =
    formData;

  return {
    username,
    email,
    age,
    occupation,
    password1: password,
    password2: repeat_password,
  };
}


function sendJSON(objectResult, response) {

  response.writeHead(200, { 'Content-Type': 'application/json' });
  // response.write(JSON.stringify(queryResult));
  console.log(JSON.stringify(objectResult));    
  response.write(JSON.stringify(objectResult));
  response.end();
}

module.exports = {
  handleRequest: async function (request, response) {
    var path = url.parse(request.url).pathname;

    if (request.method === "GET" && path.includes(".css") === false) {
      if (path === "/register") {
        renderHTML("signup.html", response);
      } else
       if (path.startsWith("/registerUsername=")) {
        var usernameToCheck = path.split("=", 2)[1].toLowerCase();

        var jsonResult = {
          status: 200,
          response: "valid",
        };

        db = getDb();

        var query = { username: usernameToCheck };

        const queryResult = await db.collection("Users").find(query).toArray();
        console.log(queryResult);

        if (!queryResult.length) {
          jsonResult.response = "invalid";
          sendJSON(jsonResult, response);
        } else {
          sendJSON(jsonResult, response);
            
        }
            
        
      } else {
        response.writeHead(404);
        response.write("Couldn't load HTML / not found");
      }
    } else if (request.method === "POST") {
      console.log("[saveUser]");
      try {
        const body = await getPostData(request);
        //const formValues = parseFormValues(body);
        //console.log(formValues);
        //var newData = JSON.stringify(formValues);

        const { username, email, age, occupation, password1, password2 } =
          JSON.parse(body);
        console.log(
          "[register-controller]",
          username,
          email,
          age,
          occupation,
          password1,
          password2
        );

        {
          let hashPassword = bcrypt.hashSync(
            password1,
            parseInt(process.env.BCRYPT_SALT)
          );
          //let hashPassword = password1

          const user = new User(
            username,
            hashPassword,
            email,
            age,
            occupation,
            password1
          );

          const db = getDb();
          db.collection("Users").insertOne(user);
          console.log(user);

          /*response.writeHead(201, { "Content-Type": "application/json" });
          response.end(
            JSON.stringify({
              route: "/signin.html",
              message: "Your account has been created successfully!",
            })
          );*/


          ///////////////
          
          /*var newToken = randomstring.generate(64);

          var query = { token: newToken };

          var queryResult = await db.collection("Tokens").find(query).toArray();
          if (!(queryResult.length === 0)) {
                  newToken = randomstring.generate(64);
              } else {
                  var newTokenRow = {
                      token: newToken,
                      createdAt: new Date().toISOString(),
                      cont_id: user.email
                  }
                  const db = getDb()
                  db.collection("Tokens").insertOne(newTokenRow);
                }

*/
          ///////////////
          fs.readFile(
            __dirname + "./../../src/html/homepage-loggedin.html",
            function (error, htmlContent) {
              if (error) {
                response.writeHead(404);
                response.write("Couldn't load HTML / not found");
                response.end();
              } else {
                response.writeHead(200, {
                  "Content-Type": "text/html; charset=UTF-8",
                  "Transfer-Encoding": "chunked",
                });
                response.write(htmlContent);
                response.end();
              }
            }
          );
        }
      } catch (err) {
        console.log(err);

        response.writeHead(500, { "Content-Type": "application/json" });
        response.end(JSON.stringify(err));
      }
    }
  },
};

/*const User = require("./usersModel");
const { getPostData } = require("./utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongodb = require('mongodb')
const getDb = require('./database').getDb
var url = require('url');
var fs = require('fs');


function renderHTML(path, res) {
    console.log(__dirname);
    fs.readFile(__dirname + "./../../../src/html/" + path, function (error, htmlContent) {
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


function renderNotFoundHTML(res) {
    console.log(__dirname);
    fs.readFile(__dirname + "./../../../src/html/pageNotFound.html", function (error, htmlContent) {
        
        if (error) {
            response.writeHead(404);
            
            response.write("Couldn't load HTML / not found");
        } else {
            console.log('ERROR');
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.write(htmlContent);
        }
        response.end();
    });
}

module.exports = {
handleRequest:async function saveUser(req, res) {

    
    var path = url.parse(request.url).pathname;

    if (request.method === "GET" && path.includes(".css") === false) {
        
        if (path === "/register") {
            renderHTML("signup.html", res);
        }  else {
            response.writeHead(404);
            response.write("Couldn't load HTML / not found");
        }
    } 
else if (request.method === "POST") {
  console.log("[saveUser]");
  try {
    const body = await getPostData(req);

    const { username, email, age, occupation, password1, password2 } = JSON.parse(body);
    console.log("[register-controller]", username, email, age, occupation, password1, password2);
{
          let hashPassword = bcrypt.hashSync(
            password1,
            parseInt(process.env.BCRYPT_SALT)
          );

          const user = new User(username, hashPassword, email, age, occupation, password1);
            console.log("[verific db acm");
        
            
         
        const db = getDb();
        db.collection('Users').insertOne(user);
        console.log(user);

        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({
            route: "/signin.html",
            message: "Your account has been created successfully!",
          })
        );
      
    }
      
  } catch (err) {
    console.log(err);

    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify(err));
  }
}}
}
*/
