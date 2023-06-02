/*var url = require('url');
var fs = require('fs');
var qs = require('querystring');
const { getPostData } = require("./utils");
const User = require("./usersModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

 
function renderHTML(path, response) {
    console.log(__dirname + "aici e renderhtml reg contr");
    fs.readFile(__dirname + "/../../../src/html/" + path, function (error, htmlContent) {
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


function renderNotFoundHTML(response) {
    console.log(__dirname);
    fs.readFile(__dirname + "/../../../src/html/pageNotFound.html", function (error, htmlContent) {
        
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
    handleRequest: async function (request, response) {

        var path = url.parse(request.url).pathname;
        if (request.method === "GET" && path.includes(".css") === false) {
            
            if (path === "/login") {
                renderHTML("signin.html", response);
            } else {
                response.writeHead(404);
                response.write("Couldn't load HTML / not found");
            }
        }
        else if (request.method === "POST") {
        console.log("[loginUser]");{
            try {
              const body = await getPostData(request);
          
              const { username, password } = JSON.parse(body);
          
              if (User.validateUsernameFormat(username) === null || username === undefined || username === '') {
                console.log(
                  "[user-controller] Username format is invalid."
                );
                res.writeHead(200, { "Content-Type": "application/json" });
          
                res.end(
                  JSON.stringify({
                    route: "/signin.html",
                    message:
                      "Username format is invalid.",
                  })
                );
              }
              else {
                const loginUser = await User.findByUsername(username);
          
                //const db = getDb();
                //const loginUser = db.collection('Users').find({ username: name }).toArray()


                if (loginUser.length) {
                  if (bcrypt.compareSync(password, loginUser[0]['password'])) {
                    const token = jwt.sign(
                      {
                        data: {
                          id: loginUser[0]['_id'],
                          username: loginUser[0]['username'],
                        },
                      },
                      "secret",
                      { expiresIn: "1h" }
                    );
          
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.end(
                      JSON.stringify({
                        route: "/homepage-loggedin.html",
                        message: "Login successful!",
                        information: token,
                      })
                    );
                  } else {
                    response.writeHead(403, { "Content-Type": "application/json" });
                    response.end(
                      JSON.stringify({ route: "/signin.html", message: "Wrong password!" })
                    );
                    console.log('password:', password);
                    console.log('loginUser:', loginUser);
                    console.log('loginUser[0]["password"]:', loginUser[0]['password']);
                  }
                } else {
                  console.log("[user-controller] Wrong username!");
                  response.writeHead(403, { "Content-Type": "application/json" });
          
                  res.end(
                    JSON.stringify({ route: "/signin.html", message: "Wrong username!" })
                  );
                }
              }
            } catch (err) {
              console.log(err);
          
              response.writeHead(500, { "Content-Type": "application/json" });
              response.end(JSON.stringify(err));
            }
        }
    }
}
}*/

var url = require("url");
var fs = require("fs");
var qs = require("querystring");
var nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const { getPostData } = require("../../utils/utils");
const User = require("../../models/usersModel");
const getDb = require("../../utils/database").getDb;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const MongoClient = require("mongodb").MongoClient;
var validator = require("validator");
var mySecret =
  "0ffiS416IDCkVfBV5L9U5W-lcc6IXtE7uaNo-Y1UJYCOEtMgv8DWLgHG_6AWJF1mQDVP74vL1VnoFKejwDz7bTQAOfaoTBtVBkvq03GfoIMZX6UvtL8m3N3bWk2g_J7wRbNHfS2AvLJmGlj7i7gdg8DX3uWP1BqX811x0O2dabX_1sR5hMKyxKLJtCCwAIqgkMXrmbj9b1RpB5utMdA9RaMP2Hp1tZWvnkX9beIPXjq8QM4rHQwsyi73zszwzXErQx6oAvq9NZxRTyJkd_mDUIp3rPNbvlXSB_W47jyHaQtPnkBq-HH2MKPC_kG02UJsQluHKH5GKzRsoPfAznAIMg";
const secondValidator = require("validate-data");
// const crypto = require('crypto');
const registrationRules = {
  required: "email username password",
  email: "email",
  string: "email name username firstName lastName interests gender",
  number: "phone",
  isSubscribed: "boolean",
};

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

  const { username, password } = formData;

  return {
    username,
    password: password,
  };
}
module.exports = {
  handleRequest: async function (request, response) {
    var path = url.parse(request.url).pathname;

    if (request.method === "GET" && path.includes(".css") === false) {
      if (path === "/login") {
        renderHTML("signin.html", response);
      } else {
        response.writeHead(404);
        response.write("Couldn't load HTML / not found");
      }
    } else if (request.method === "POST" && path === "/login") {
		console.log("[loginUser]");
		{
		  try {
			const body = await getPostData(request);
	  
			const { username, password } = JSON.parse(body);
			console.log(username);
			console.log(password);
			console.log("----");
			console.log(body);
	  
			if (
			  User.validateUsernameFormat(username) === null ||
			  username === undefined ||
			  username === ""
			) {
			  console.log("[user-controller] Username format is invalid.");
	  
			  response.writeHead(200, { "Content-Type": "application/json" });
			  response.end(
				JSON.stringify({
				  route: "/signin.html",
				  message: "Username format is invalid.",
				})
			  );
			} else {
			  const loginUser = await User.findByUsername(username);
	  
			  if (loginUser.length) {
				if (bcrypt.compareSync(password, loginUser[0]["password"])) {
				  const token = jwt.sign(
					{
					  data: {
						id: loginUser[0]["_id"],
						username: loginUser[0]["username"],
					  },
					},
					"secret",
					{ expiresIn: "1h" }
				  );
	  
				  // Set the cookie
				  response.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly`);
	  
				  response.writeHead(200, { "Content-Type": "application/json" });
				  response.end(
					JSON.stringify({
					  route: "/homepage-loggedin.html",
					  message: "Login successful!",
					  information: token,
					})
				  );
				} else {
				  response.writeHead(403, { "Content-Type": "application/json" });
				  response.end(
					JSON.stringify({
					  route: "/signin.html",
					  message: "Wrong password!",
					})
				  );
				  console.log("password:", password);
				  console.log("loginUser:", loginUser);
				  console.log(
					'loginUser[0]["password"]:',
					loginUser[0]["password"]
				  );
				}
			  } else {
				console.log("[user-controller] Wrong username!");
				response.writeHead(403, { "Content-Type": "application/json" });
	  
				res.end(
				  JSON.stringify({
					route: "/signin.html",
					message: "Wrong username!",
				  })
				);
			  }
			}
		  } catch (err) {
			console.log(err);
	  
			response.writeHead(500, { "Content-Type": "application/json" });
			response.end(JSON.stringify(err));
		  }
		}
	  }
  },
};
