const product = require("../models/product");
const {ProductService} = require("../service/productServiceImplementation");
const {Product} = require("../models/product");
const {Form} = require("../models/form");

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
            token = null,
            name = null,
            description = null,
            type = null,
            picture = null,
            status = null,
            subcategory = null,
            category = null;
        var formfields = [];
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
                    return true;
                } else if (key === "status") {
                    status = value;
                } else if (key === "subcategory") {
                    subcategory = value;
                    return true;
                } else if (key === "category") {
                    category = value;
                    return true;
                } else if (key === "fieldName") {
                    formfields[val] = value;
                    val++;
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
        console.log(formfields.toString());
        console.log("username: " + username + ", name: " + name + ", description: " + description + ", type: " + type + ", picture: " + picture + ", status: " + status + ", category: " + category + ", subcategory: " + subcategory);
        const pr = new Product(username, name, description, type, picture, status, category, subcategory);
        const frm = new Form(formfields, pr._id);
        pr.setFormFieldsId(frm._id.toString());

        if (username === null || name === null || description === null || type === null || picture === null || status === null || category === null || subcategory === null) {
            responseBody = responseBody + "Invalid Json format.";
            console.log("[Error] A field is null.")
        } else if (userExists) {
            try {
                productImport.putObject(pr);
            } catch (err) {
                responseBody = err.toString();
                alert(err);
            }

            try {
                productImport.putForm(frm);
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
    if (extractedProducts.length === 0) {
        number = "No product in this category."
    } else if (!extractedProducts.length > 0) {
        number = "Failed to extract product."
    } else {
        number = extractedProducts.length;
    }

    console.log(extractedProducts);


    response.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });

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