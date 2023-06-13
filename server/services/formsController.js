const Review = require("../../models/reviewModel");
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

async function postHandler(request, response, prodId) {
  let responseBody = null;
  const qs = require("qs");
  let chunks = [];

  request.on("data", (chunk) => {
    chunks.push(chunk);
  });

  request.on("end", () => {
    const body = Buffer.concat(chunks);

    var formfieldsQuestion = [];
    var formfieldsEmotions = [];

    var val = 0;
    var val1 = 0;

    const cookieHeader = request.headers?.cookie;
    
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjQ4ODQ2MGI4NDE5ZTk5M2VmZmQyNjJiIiwidXNlcm5hbWUiOiJtaXJ1bmFlbGVuYSJ9LCJpYXQiOjE2ODY2NTI1NzYsImV4cCI6MTY4NjY2MzM3Nn0.wphAkH1L248CgNpiciaRHFCBd5rQJ6OtO0orxghAUIg";

    if (cookieHeader) {
      cookieHeader.split(`;`).forEach((cookie) => {
        let [name, ...rest] = cookie.split(`=`);
        if (name === "jwt") {
          value = rest.join(`=`).trim();
          if (value) {
            token = decodeURIComponent(value);
          }
        }
      });
    }

    // decodificare token preluat din cookie
    const decodedToken = jwt.verify(token, "secret");
    // username-ul celui care vrea sa adauge review-ul
    const username = decodedToken["data"]["username"];

    const parsedData = JSON.parse(body, (key, value) => {
      if (key === "idProduct") {
        idProduct = value;
        return true;
      } else if (key === "category") {
        category = value;
        return true;
      }else if (
        key !== "formFields" &&
        key !== "idProduct" &&
        key !== "" &&
        key !== "0" &&
        key !== "1" &&
        key !== "2" &&
        key !== "3" &&
        key !== "4" &&
        key !== "5" &&
        key !== "6" &&
        key !== "8" &&
        key !== "9" &&
        key !== "10"
      ) {
        formfieldsQuestion[val] = key;
        val++;

        formfieldsEmotions[val1] = value;
        val1++;
      }

      return false;
    });

    console.log(formfieldsQuestion.toString());
    console.log(formfieldsEmotions.toString());

    const review = new Review(
      username,
      category,
      idProduct,
      formfieldsQuestion,
      formfieldsEmotions
    );

    try {
      review.save();
    } catch (err) {
      responseBody = err.toString();
      alert(err);
    }

    if (responseBody === null) {
      responseBody = "POST successful.";
    }

    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.write(
      JSON.stringify({
        message: responseBody,
      })
    );
    response.end();
  });
}

async function getHandler(request, response, prodId) {
  prodId = "6487315d9496eab941a41282";
  const reviews = await Review.findById(prodId);

  response.writeHead(200, {
    "Content-Type": "application/json",
  });

  response.write(
    JSON.stringify({
      reviews,
    })
  );

  response.end();
}

module.exports = { defaultHandler, postHandler, getHandler };
