const User = require("../models/usersModel");
const { getPostData } = require("../utils/utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// register user POST /add-user
async function saveUser(req, res) {
  console.log("[saveUser]");
  try {
    const body = await getPostData(req);

    const { username, email, age, occupation, password1, password2 } = JSON.parse(body);
    console.log("[user-controller]", username, email, age, occupation, password1, password2);

    if (User.validateUsernameFormat(username) === null || username === undefined || username === '') {
      console.log(
        "[user-controller] Username format is invalid. Don't use special characters such as $, <>, ! or {}!"
      );
      res.writeHead(200, { "Content-Type": "application/json" });

      res.end(
        JSON.stringify({
          route: "/signup.html",
          message:
            "Username format is invalid. Don't use special characters such as $, ! or {}!",
        })
      );
    } else {
      const findUser = await User.findByUsername(username);

      if (!findUser.length) {
        if (User.validateEmailFormat(email) === null || email === undefined || email === '') {
          console.log(
            "[user-controller] Email must not contain special characters such as $, ! or {}!"
          );
          res.writeHead(200, { "Content-Type": "application/json" });

          res.end(
            JSON.stringify({
              route: "/signup.html",
              message:
                "Email must not contain special characters such as $, ! or { }",
            })
          );
        } else if (User.validatePasswordFormat(password1) === null || password1 === undefined || password1 === '') {
          console.log(
            "[user-controller] Password: 1 number, 1 uppercase, 1 lowercase and at least 8 from the mentioned characters!"
          );
          res.writeHead(200, { "Content-Type": "application/json" });

          res.end(
            JSON.stringify({
              route: "/signup.html",
              message:
                "Password: 1 number, 1 uppercase, 1 lowercase and at least 8 from the mentioned characters!",
            })
          );
        } else if (password1 !== password2) {
          console.log(
            "[user-controller] Please make sure your passwords match!"
          );
          res.writeHead(200, { "Content-Type": "application/json" });

          res.end(
            JSON.stringify({
              route: "/signup.html",
              message: "Please make sure your passwords match!",
            })
          );
        } else {
          let hashPassword = bcrypt.hashSync(
            password1,
            parseInt(process.env.BCRYPT_SALT)
          );

          const user = new User(username, hashPassword, email
            , age, occupation, password1);
          user.save();

          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              route: "/signin.html",
              message: "Your account has been created successfully!",
            })
          );
        }
      } else {
        console.log(
          "[user-controller] Username (%s) already exists!",
          username
        );
        res.writeHead(409, { "Content-Type": "application/json" });

        res.end(
          JSON.stringify({
            route: "/signup.html",
            message: "Username already exists!",
          })
        );
      }
    }
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}



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
  saveUser,
};