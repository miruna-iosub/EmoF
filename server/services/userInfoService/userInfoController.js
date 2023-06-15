var url = require("url");
var fs = require("fs");
var qs = require("querystring");
const { getPostData } = require("../../../utils/utils");
const User = require("../../../models/usersModel");
const getDb = require("../../../utils/database").getDb;
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
  console.log("ajunge aiiiiiici")

  let responseBody = null;
  const qs = require("qs");
  let chunks = [];
  let token=""

  request.on("data", (chunk) => {
    chunks.push(chunk);
  });

  request.on("end", async () => {
    const body = Buffer.concat(chunks);
    console.log("ajunge aici")
    const parsedData = JSON.parse(body, (key, value) => {
      //currentUsername, username, age, password1, password2
      if (key === "currentUsername") {
        currentUsername = value;
        return true;
      } else if (key === "usernameNew") {
        usernameNew = value;
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
      console.log(usernameFromToken)
      if (bcrypt.compareSync(password1, queryResult[0]["password"]))
      //if (queryResult && age > 18)
     {
        db.collection("Users").updateOne(
          { username: currentUsername }, // Filter condition
          {
            $set: {
              username: usernameNew,
              age: age,
              password: hashPassword,
              password1: password2,
            },
          }
        );

        responseBody = "Update successful.";

        response.writeHead(200, {
          "Content-Type": "application/json",
          'Access-Control-Allow-Credentials': true
        });
        response.write(
          JSON.stringify({
            route: "/myaccount.html",
            message: responseBody
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


async function getHandler(req, res) {
  // get user GET /api-user-info
  try {
    // userId il iau din token-ul din cookie...

   /* let value = ""
    let token1 = ""
    const cookieHeader = req.headers?.cookie
    console.log(cookieHeader)
    if(cookieHeader) {
      cookieHeader.split(`;`).forEach(cookie => {
        let [name, ...rest] = cookie.split(`=`)
        if(name === "jwt") {
          value = rest.join(`=`).trim()
          if(value) {
            token1 =  decodeURIComponent(value)
          }
        }
      });
    }
*/
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjQ4ODQ2MGI4NDE5ZTk5M2VmZmQyNjJiIiwidXNlcm5hbWUiOiJtaXJ1bmFlbGVuYSJ9LCJpYXQiOjE2ODY2NTI1NzYsImV4cCI6MTY4NjY2MzM3Nn0.wphAkH1L248CgNpiciaRHFCBd5rQJ6OtO0orxghAUIg";

    // decodificare token preluat din cookie
    const decodedToken = jwt.verify(token, "secret");
    const username = decodedToken["data"]["username"];
    console.log(username)
    // user-ul din sesiunea curenta
    const user = await User.findByUsername(username);
    console.log(user)

    const products = await User.findProducts(username);

    const responseData = {
      user: user,
      products: products
    };

    response.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "http://localhost:4000",
      "Access-Control-Allow-Credentials" : true
    });

    response.end(JSON.stringify(responseData));
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
