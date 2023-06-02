var url = require("url");
var fs = require("fs");
var qs = require("querystring");
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


module.exports = {
  handleRequest: async function (request, response) {
    var path = url.parse(request.url).pathname;

    if (request.method === "GET" && path.includes(".css") === false) {
      if (path === "/user-info") {
        renderHTML("myaccount.html", response);
      } 
    } else if (request.method === "POST" && path === "/user-info") {
      console.log("[saveUser]");
      try {
        const body = await getPostData(request);
        //const formValues = parseFormValues(body);
        //console.log(formValues);
        //var newData = JSON.stringify(formValues);

        const {currentUsername, username, age, password1, password2 } =
          JSON.parse(body);
        console.log(
          "[user-info-controller]",
          currentUsername,
          username,
          age,
          password1,
          password2
        );

        {
          let hashPassword = bcrypt.hashSync(
            password2,
            parseInt(process.env.BCRYPT_SALT)
          );
          //let hashPassword = password1

          var query = { username: currentUsername };
          const db = getDb();
          const queryResult = await db.collection("Users").findOne(query);
          //console.log(user);
            console.log(bcrypt.compareSync("$2b$10$QkcYRlfLVsH9gKvRzPbv1u5seeZ5TIfXg0hsZFpG4kr1n8dq8EKPa", 'Miruna1234'))
          if(queryResult){
            db.collection('Users').updateOne(
                { username: currentUsername }, // Filter condition
                {
                  $set: {
                    username: username,
                    age: age,
                    password: hashPassword,
                    password1: password2
                  }
                }
              );
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
        }
      } catch (err) {
        console.log(err);

        response.writeHead(500, { "Content-Type": "application/json" });
        response.end(JSON.stringify(err));
      }
    }
  },
};