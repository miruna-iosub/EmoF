const User = require("../models/usersModel");
const { getPostData } = require("../utils/utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// login 
async function loginUser(req, res) {
  try {
    const body = await getPostData(req);

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

      if (loginUser.length) {
        if (bcrypt.compareSync(password, loginUser[0]['password'])) {
          const token = jwt.sign(
            {
              data: {
                id: loginUser[0]['_id'],
                username: loginUser[0]['username'],
              },
            },
           process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              route: "/homepage-loggedin.html",
              message: "Login successful!",
              information: token,
            })
          );
        } else {
          res.writeHead(403, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ route: "/signin.html", message: "Wrong password!" })
          );
          console.log('password:', password);
          console.log('loginUser:', loginUser);
          console.log('loginUser[0]["password"]:', loginUser[0]['password']);
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