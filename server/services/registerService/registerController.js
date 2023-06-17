const bcrypt = require("bcrypt");
const User = require("./models/usersModel");
const jwt = require("jsonwebtoken");

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

async function postHandler(request, response) {
    let responseBody = null;
    const qs = require("qs");
    let chunks = [];
  
    request.on("data", (chunk) => {
      chunks.push(chunk);
    });
  
    request.on("end", async () => {
      const body = Buffer.concat(chunks);
  
      const parsedData = JSON.parse(body, (key, value) => {
        if (key === "username") {
          username = value;
          return true;
        } else if (key === "email") {
          email = value;
          return true;
        } else if (key === "age") {
          age = value;
          return true;
        } else if (key === "occupation") {
          occupation = value;
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
  
      try {
        if (
          !User.validateUsernameFormat(username) ||
          !username ||
          username === ""
        ) {
          console.log(
            "Username format is invalid. Don't use special characters such as $, <>, ! or {}!"
          );
          responseBody =
            "Username format is invalid. Don't use special characters such as $, ! or {}!";
  
          response.writeHead(200, {
            "Content-Type": "application/json",
          });
          response.write(
            JSON.stringify({
              route: "/signup.html",
              message: responseBody,
            })
          );
          response.end();
        } else {
          const findUser = await User.findByUsername(username);
  
          if (!findUser.length) {
            if (
              !User.validateEmailFormat(email) ||
              !email ||
              email === ""
            ) {
              console.log(
                "[user-controller] Email must not contain special characters such as $, ! or {}!"
              );
  
              responseBody =
                "Email must not contain special characters such as $, ! or {}!";
  
              response.writeHead(200, {
                "Content-Type": "application/json",
              });
              response.write(
                JSON.stringify({
                  route: "/signup.html",
                  message: responseBody,
                })
              );
              response.end();
            } else if (
              !User.validatePasswordFormat(password1) ||
              !password1 ||
              password1 === ""
            ) {
              console.log(
                "[user-controller] Password: 1 number, 1 uppercase, 1 lowercase and at least 8 from the mentioned characters!"
              );
              responseBody =
                "Password: 1 number, 1 uppercase, 1 lowercase and at least 8 from the mentioned characters!";
  
              response.writeHead(200, {
                "Content-Type": "application/json",
              });
              response.write(
                JSON.stringify({
                  route: "/signup.html",
                  message: responseBody,
                })
              );
              response.end();
            } else if (password1 !== password2) {
              console.log(
                "[user-controller] Please make sure your passwords match!"
              );
  
              responseBody = "Please make sure your passwords match!";
  
              response.writeHead(200, {
                "Content-Type": "application/json",
              });
              response.write(
                JSON.stringify({
                  route: "/signup.html",
                  message: responseBody,
                })
              );
              response.end();
            } else {
              const user = new User(
                username,
                hashPassword,
                email,
                age,
                occupation,
                password2
              );
  
              await user.save();
  
              responseBody = "POST successful.";
  
              response.writeHead(200, {
                "Content-Type": "application/json",
              });
              response.write(
                JSON.stringify({
                  route: "/signin.html",
                  message: responseBody,
                })
              );
              response.end();
            }
          } else {
            console.log(
              "[user-controller] Username (%s) already exists!",
              username
            );
            response.writeHead(409, { "Content-Type": "application/json" });
  
            response.end(
              JSON.stringify({
                route: "/signup.html",
                message: "Username already exists!",
              })
            );
          }
        }
      } catch (err) {
        responseBody = err.toString();
        console.log(err);
  
        response.writeHead(500, { "Content-Type": "application/json" });
        response.end(JSON.stringify(err));
      }
    });
  }
  

async function getHandler(request, response, id) {
  // get user GET /register/{id}
  try {
    const user = await User.findById(id);

    if (!user) {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(user));
    }
  } catch (err) {
    console.log(err);

    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify(err));
  }
}


// get users GET /get-users
async function getHandlerAll(req, res) {
  try {
    const users = await User.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

module.exports = { defaultHandler, postHandler, getHandler, getHandlerAll };
