var url = require("url");
var fs = require("fs");
var qs = require("querystring");
const { getPostData } = require("./utils/database");
const User = require("./models/usersModel");
const getDb = require("./utils/database").getDb;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function parseCookieHeader(cookieHeader) {
  const cookies = {};
  
  if (cookieHeader) {
    const cookiePairs = cookieHeader.split(';');
    
    for (const pair of cookiePairs) {
      const [name, value] = pair.trim().split('=');
      cookies[name] = decodeURIComponent(value);
    }
  }
  
  return cookies;
}

defaultHandler = (request, response) => {
  response.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin" : "http://localhost:4000",
  });

  response.write(
    JSON.stringify({
      message: `API not found at ${request.url}`,
    })
  );
  response.end();
};

async function patchHandler(request, response) {
  console.log("[ patchHandler ]")

  let responseBody = null;
  const qs = require("qs");
  let chunks = [];
  let token=""

  request.on("data", (chunk) => {
    chunks.push(chunk);
  });

  request.on("end", async () => {
    const body = Buffer.concat(chunks);
    const parsedData = JSON.parse(body, (key, value) => {
      //currentUsername, username, age, password1, password2
      if (key === "email") {
        email = value;
        return true;
      } else if (key === "occupation") {
        occupation = value;
        return true;
      } else if (key === "age") {
        age = value;
        return true;
      } else if (key === "password1") {
        password1 = value;
        return true;
      } else if (key === "password2") {
        password2 = value;
        return true;
      }
      return false;
    });

    let hashPassword = bcrypt.hashSync(
      password1,
      parseInt(process.env.BCRYPT_SALT)
    );
    //let hashPassword = password1

    try {
      const db = getDb();

    {
      const authorizationHeader = request.headers.authorization;
      if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
          let token = authorizationHeader.substring(7);
              console.log("NOUL TOKEN")
              console.log(token)

      // decodificare token preluat din cookie
      console.log("iar tokenul" + token)
      const decodedToken = jwt.verify(token, "secret");
      //const userId = decodedToken['data']['id']

      //const queryResult = await User.findById(decodedToken['data']['id']);
      const usernameFromToken = decodedToken['data']['username']

      const queryResult = await User.findByUsername(usernameFromToken);

      console.log("username from token")
      console.log(usernameFromToken)
      if (bcrypt.compareSync(password1, queryResult[0]["password"]))
      //if (queryResult && age > 18)
     {
        db.collection("Users").updateOne(
          { username: usernameFromToken }, // Filter condition
          {
            $set: {
              email: email,
              age: age,
              occupation: occupation,
              password: hashPassword,
              password1: password2,
            },
          }
        );

        const token = jwt.sign(
          {
            data: {
              id: queryResult[0]["_id"],
              username: queryResult[0]["username"],
            },
          },
          "secret",
          { expiresIn: "3h" }
        );


        
        responseBody = "Update successful.";

        response.writeHead(200, {
          "Content-Type": "application/json",
          'Access-Control-Allow-Credentials': true
        });
        response.write(
          JSON.stringify({
            route: "/account",
            message: responseBody,
            information: token
          })
        );
        response.end();
      } else {
        responseBody =
          "Old password is wrong and you have to be older than 18!";
        console.log(responseBody);

        response.writeHead(500, { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials" : true
        });
        response.end(JSON.stringify(responseBody));
      }
    }}
    } catch (err) {
      {
        responseBody = err.toString();
        console.log(err);

        response.writeHead(500, { "Content-Type": "application/json",
        "Access-Control-Allow-Credentials" : true
      });
        response.end(JSON.stringify(err));
      }
    }
  });
}
async function getHandler(request, response) {
  try {
    let chunks = [];

    console.log("[ gethandler userprofile ]")
    const authorizationHeader = request.headers.authorization;
    console.log(authorizationHeader)
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.substring(7);
      const decodedToken = jwt.verify(token, "secret");
      const username = decodedToken["data"]["username"];
      console.log("username din decoded " + username)
      // Retrieve user information from the database
      const userDetails = await User.findByUsername(username);

      console.log(userDetails)
      // Construct the response data
      const responseData = {
        user: userDetails,
      };

      response.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "http://localhost:4000",
        "Access-Control-Allow-Credentials" : true
      });

      response.end(JSON.stringify(responseData));
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

module.exports = { defaultHandler, patchHandler, getHandler };
