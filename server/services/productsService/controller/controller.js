const product = require("../models/product");
const {ProductService} = require("../service/productServiceImplementation");
const {Product} = require("../models/product");
const {Form} = require("../models/form");
const {isArray, isNumber} = require("util");

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


async function postHandler(request, response) {
    let responseBody = null;
    const qs = require('qs');
    let chunks = [];
    request.on("data", (chunk) => {
        chunks.push(chunk);
    });
    request.on("end", async () => {
        const data = Buffer.concat(chunks);
        //  const parsedData = qs.parse(data.toString());
        const productImport = new ProductService();
        var UserExists = false;

        var username = null,
            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjQ3NjFmZjc1NmQyNWNlMTYzYmE2ZTNhIiwidXNlcm5hbWUiOiJtaXJ1bmFlbGVuYSJ9LCJpYXQiOjE2ODY1ODU0NzEsImV4cCI6MTY4NjU5NjI3MX0.b2LeSzZuY2Pbwom2QxG_VBqPyN6dt1xYuEihTQF0JXg",
            name = null,
            description = null,
            type = null,
            picture = null,
            status = null,
            subcategory = null,
            category = null,
        expirationDate=null;
        let index=0;
        let formFields = [];
        var val = 0;
        // console.log(parsedData);
        const parsedData = JSON.parse(
            data,
            (key, value) => {
                if (key === "username") {
                    username = value;
                    return true;
                }
                if (key === "token") {
                    token = value;
                    return true;
                } else if (key === "name") {
                    name = value;
                    return true;
                } else if (key === "description") {
                    description = value;
                    return true;
                } else if (key === "type") {
                    type = value;
                    return true;
                } else if (key === "picture") {
                    picture = value;
                    return true;}
                else if (key === "expirationDate") {
                    expirationDate = value;
                        return true;
                } else if (key === "status") {
                    status = value;
                } else if (key === "subcategory") {
                    subcategory = value;
                    return true;
                } else if (key === "category") {
                    category = value;
                    return true;
                } else if (key.match(/^[0-9]+$/) != null&&key!==""||(key==="0"&&value!==""&&value!==null)) {
                    formFields[index] = value;
                    index++;
                    return true;
                }
                return false;

            });

        let tokens;
        /** try {
            userExists = productImport.tokenUsername(token, username);
            if(userExists===false){
                responseBody = "Invalid user details. ";
            }
        } catch (e) {
            responseBody = "Invalid user details. ";
            userExists = false;
        }
         **/

        let userExists = false;
        try {
            tokens = await productImport.findByToken(token);
            console.log(tokens);
        } catch (err) {
            userExists = false;
        }
        if (tokens.length > 0) {
            userExists = true;
        }
        console.log(userExists);
        console.log(formFields.toString());
        console.log("username: " + username + ", name: " + name + ", description: " + description + ", type: " + type + ", picture: " + picture + ", status: " + status + ", category: " + category + ", subcategory: " + subcategory + formFields);
        const pr = new Product(username, name, description, type, picture, status, category, subcategory);
        const frm = new Form(formFields, pr._id);
        pr.setFormFieldsId(frm._id.toString());

        if (username === null || name === null || description === null || type === null || picture === null || status === null || category === null || subcategory === null) {
            responseBody = responseBody + "Invalid Json format.";
            console.log("[Error] A field is null.")
        } else if (userExists) {
            try {
                await productImport.putObject(pr);
            } catch (err) {
                responseBody = err.toString();
                alert(err);
            }

            try {
                await productImport.putForm(frm);
            } catch (err) {
                responseBody = err.toString();
                alert(err);
            }
            console.log(responseBody);
            if (responseBody === null) {
                responseBody = "POST successful."
            }
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


async function getHandler(request, response, type, string) {
    let extractedProducts;
    const product = new ProductService();
    let number;
    let findid = false;
    console.log(type);
    if (type === "all") {
        extractedProducts = await product.findAll();
        number = await product.countAll();
        findid=true;
    } else if (type === "homepage") {
        extractedProducts = await product.findFirst();
        for (let index = 6; index < extractedProducts.length; index++) {
            if (index > extractedProducts.length) {
                break;
            }
            extractedProducts[index] = null;
        }
    } else if (type === "idorcategory") {

        if (string === "product" || string === "event" || string === "geographicalPlace" || string === "service" || string === "artisticArtefact") {
            extractedProducts = await product.findByCategory(string);
            // number = await product.countByCategory(string);

        } else {
            extractedProducts = await product.findById(string);
            findid = true;
        }
    }
    else if(type==="formfields"){
        if (string === "product" || string === "event" || string === "geographicalPlace" || string === "service" || string === "artisticArtefact"|| string === "person") {
            let extractedProducts1 = await product.findFormFields(string);
            extractedProducts=extractedProducts1[0];
            // number = await product.countByCategory(string);

        } else {
            extractedProducts = await product.findById(string);
            findid = true;
        }
    }
    if(type==="formfields"){
        number=1;
    }
    else if (extractedProducts.length === 0) {
        number = "No product in this category."
    } else if (!extractedProducts.length > 0) {
        number = "Failed to extract product."
    } else {
        number = extractedProducts.length;
    }

    console.log(extractedProducts);


    response.write(
        JSON.stringify({
            numberProducts: number,
            products:
            extractedProducts
        })
    );

    response.end();
}

module.exports = {defaultHandler, postHandler, getHandler};