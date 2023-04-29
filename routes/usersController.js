const User = require("./usersModel");
const { getPostData } = require("../utils/utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// login user POST /login-user
async function loginUser(req, res) {
  try {
    const body = await getPostData(req);

    const { username, password } = JSON.parse(body);

    if (User.validateUsernameFormat(username) === null || username === undefined || username === '') {
      console.log(
        "[user-controller] Username format is invalid. Don't use special characters such as $, <>, ! or {}!"
      );
      res.writeHead(200, { "Content-Type": "application/json" });

      res.end(
        JSON.stringify({
          route: "/signin.html",
          message:
            "Username format is invalid. Don't use special characters such as $, <>, ! or {}!",
        })
      );
    }
    else if(User.validatePasswordFormat(password) === null || password === undefined || password === '') {
      console.log(
        "[user-controller] Password: 1 number, 1 uppercase, 1 lowercase and at least 8 from the mentioned characters!"
      );
      res.writeHead(200, { "Content-Type": "application/json" });

      res.end(
        JSON.stringify({
          route: "/signin.html",
          message:
            "Password: 1 number, 1 uppercase, 1 lowercase and at least 8 from the mentioned characters!",
        })
      );
    }
    else {
      const loginUser = await User.findByUsername(username);

      if (loginUser.length) {
        //check passwords
        if (bcrypt.compareSync(password, loginUser[0]["password"])) {
          const token = jwt.sign(
            {
              data: {
                id: loginUser[0]["_id"],
                email: loginUser[0]["email"],
                username: loginUser[0]["username"],
              },
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              route: "/index.html",
              message: "Login successful!",
              information: token,
            })
          );
        } else {
          res.writeHead(403, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ route: "/signin.html", message: "Wrong password!" })
          );
        }
      } else {
        console.log("[user-controller] Wrong username!");
        res.writeHead(403, { "Content-Type": "application/json" });

        res.end(
          JSON.stringify({ route: "/signin.html", message: "Wrong username!" })
        );
      }
    }
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}


module.exports = {
  loginUser,
};