const Review = require("./models/reviewModel");
const jwt = require("jsonwebtoken");

defaultHandler = (request, response) => {
    response.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:4000",
        "Access-Control-Allow-Credentials": true
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

    request.on("end", async () => {
        const body = Buffer.concat(chunks);

        var formfieldsQuestion = [];
        var formfieldsEmotions = [];
        let idProduct;
        let category;
        let username;
        let i = 0;
        var val = 0;
        var val1 = 0;
        // const cookieHeader = request.headers?.cookie;
        //
        // let token =
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjQ4ODQ2MGI4NDE5ZTk5M2VmZmQyNjJiIiwidXNlcm5hbWUiOiJtaXJ1bmFlbGVuYSJ9LCJpYXQiOjE2ODY2NTI1NzYsImV4cCI6MTY4NjY2MzM3Nn0.wphAkH1L248CgNpiciaRHFCBd5rQJ6OtO0orxghAUIg";
        //
        // if (cookieHeader) {
        //     cookieHeader.split(`;`).forEach((cookie) => {
        //         let [name, ...rest] = cookie.split(`=`);
        //         if (name === "jwt") {
        //             value = rest.join(`=`).trim();
        //             if (value) {
        //                 token = decodeURIComponent(value);
        //             }
        //         }
        //     });
        // }
        //
        // // decodificare token preluat din cookie
        // const decodedToken = jwt.verify(token, "secret");
        // // username-ul celui care vrea sa adauge review-ul
        // // const username = decodedToken["data"]["username"];

        const parsedData = JSON.parse(body, (key, value) => {
            if (key === "idProduct") {

                idProduct = value;
                return true;
            } else if (key.match(/^[0-9]+$/) != null) {
                formfieldsEmotions[i] = value;
                i++;
                return true;
            }

            return false;
        });


        let product = await new Review().findProductById(idProduct);
        category = product[0].category;

        let fields = await new Review().findFieldsObjectId(idProduct);
        i=0;
        for(let field of fields[0].fields) {
            formfieldsQuestion[i] = field.toString();
            i++;
        }

        // console.log(idProduct.toString());
        // console.log(formfieldsQuestion.toString());
        // console.log(formfieldsEmotions.toString());
        // console.log(username.toString());
        // console.log(category.toString());


        const review = new Review(
       //     username,
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
            "Access-Control-Allow-Origin": "http://localhost:4000",
            "Access-Control-Allow-Credentials": true
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

    const reviews = await new Review().findFieldsObjectId(prodId);
    //
    // response.writeHead(200, {
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin" : "*",
    //   "Access-Control-Allow-Credentials" : true
    // });
    console.log(reviews.toString());
    response.write(
        JSON.stringify({
            reviewsFields: reviews,
        })
    );

    response.end();
}

module.exports = {defaultHandler, postHandler, getHandler};
