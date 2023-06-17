var url = require("url");
var fs = require("fs");
const { getPostData } = require("./database/utils");
const User = require("./models/usersModel");
const getDb = require("./database/database").getDb;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

defaultHandler = (request, response) => {
  response.writeHead(200, {
    "Content-Type": "application/json",
  });
  response.write(
    JSON.stringify({
      message: `API not found at ${request.url}`,
    })
  );
  response.end();
};

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


async function postHandler(request, response) {
  console.log("[loginUser]");
  {
    try {
      const body = await getPostData(request);
      console.log(body)
      //const formValues = parseFormValues(body);
      //console.log(formValues);
      //var newData = JSON.stringify(formValues);

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
              { expiresIn: "3h" }
            ); 

            // Set the cookie
           // response.('Set-Cookie', `token=${token}; Path=/; HttpOnly`);
            console.log(token)


            var newTokenRow = {
              token: token,
              createdAt: new Date().toISOString(),
              username: loginUser[0]["username"],
            };

            const db = getDb();
            db.collection("Tokens").insertOne(
              newTokenRow,
              function (error, success) {
                if (error) {
                  throw error;
                }
                console.log("Inserted");
              }
            );
              console.log("final de login")
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(
              JSON.stringify({
                route: "/homepage",
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
            console.log('loginUser[0]["password"]:', loginUser[0]["password"]);
          }
        } else {
          console.log("[user-controller] Wrong username!");
          response.writeHead(403, { "Content-Type": "application/json" });

          response.end(
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

async function deleteHandler(request, response) {
  console.log("[DELETE HANDLER]");
  try{
  const authorizationHeader = request.headers.authorization;
  console.log(authorizationHeader)
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.substring(7);
    const decodedToken = jwt.verify(token, "secret");
    const username = decodedToken["data"]["username"];
    console.log("username din decoded " + username)
 
    const user = await User.findByUsername(username);
    console.log(user)
    
    if (!user) {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      await User.remove(username);
      console.log("username ul userului")
      console.log(username)

      const user = await User.findByUsername(username);
      console.log("acesta e userul dupa ce a fost sters : " + user)

      
              console.log("final de ddelete")
              response.writeHead(200, {
                "Content-Type": "application/json",
                'Access-Control-Allow-Credentials': true
              });
              response.write(
                JSON.stringify({
                  route: "/deleteaccountconfirmation.html",
                  message: "User deleted!!",
                })
              );
              response.end();
    }
  }
} catch (err) {
  console.log(err);

  response.writeHead(500, { 
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials" : true
  });
  response.end(JSON.stringify(err));
}
  
}







module.exports = { defaultHandler, postHandler, deleteHandler };
