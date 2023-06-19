const Review = require("./models/reviewModel");
const jwt = require("jsonwebtoken");

defaultHandler = (request, response) => {
    response.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:4000",
        "Access-Control-Allow-Credentials": true,
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
        i = 0;
        for (let field of fields[0].fields) {
            formfieldsQuestion[i] = field.toString();
            i++;
        }

        // console.log(idProduct.toString());
        // console.log(formfieldsQuestion.toString());
        // console.log(formfieldsEmotions.toString());
        // console.log(username.toString());
        // console.log(category.toString());

        const review = new Review(
            category,
            idProduct,
            formfieldsQuestion,
            formfieldsEmotions
        );

        try {
            await review.save();
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

    try {
        const reviews = await new Review().findFieldsObjectId(prodId);
        //
        // response.writeHead(200, {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin" : "*",
        //   "Access-Control-Allow-Credentials" : true
        // });

        response.write(
            JSON.stringify({
                reviewsFields: reviews,
            })
        );
    } catch (err) {
    }
    response.end();
}

module.exports = {defaultHandler, postHandler, getHandler};
