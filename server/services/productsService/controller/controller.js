const product = require("../models/product");
const {ProductService} = require("../service/productServiceImplementation");
const {Product} = require("../models/product");
const {Form} = require("../models/form");
const {isArray, isNumber} = require("util");
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
            pictureGiven = null,
            picture = null,
            subcategory = null,
            category = null,
            expirationDate = null;
        let status = "ongoing";
        let index = 0;
        let formFields = [];

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
                    if (value === "" || value === " " || value === "  " || value === "   " || value === null) {
                        picture = new PicturePlaceholder().prettyNoPicture;
                    } else {
                        picture = value;
                    }
                    return true;
                } else if (key === "expirationDate") {
                    expirationDate = value;
                    return true;
                } else if (key === "subcategory") {
                    subcategory = value;
                    return true;
                } else if (key === "category") {
                    category = value;
                    return true;
                } else if (key.match(/^[0-9]+$/) != null && key !== "" && key !== " " && value !== "" && value !== " " && value !== null) {
                    formFields[index] = value;
                    index++;
                    return true;
                }
                return false;
            });
        if (expirationDate == null || expirationDate === "") {
            var date = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(date.getDate() + 1);
            expirationDate = date.toLocaleString();

        }
        expirationDate = expirationDate.replaceAll("-", "/");

        let usernames;
        let userExists = false;
        let pr;
        let frm;
        const authorizationHeader = request.headers.authorization;
        try {
            if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
                let token = authorizationHeader.substring(7);
                const decodedToken = jwt.verify(token, "secret");
                username = decodedToken['data']['username'];
            }


            try {
                usernames = await productImport.findByUsername(username);
            } catch (err) {
                userExists = false;
            }
            if (usernames.length > 0) {
                userExists = true;
            }
            pr = new Product(username, name, description, type, picture, status, expirationDate, category, subcategory);
            frm = new Form(formFields, pr._id);
            pr.setFormFieldsId(frm._id.toString());


            /**if picture is null -> placeholder**/
        } catch (e) {
            console.log(e);
            userExists = false;
        }


        if (username === null || name === null || description === null || type === null || status === null || category === null || subcategory === null) {
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
    let extractedProducts = [];
    const product = new ProductService();
    let number;
    let findid = false;

    if (type === "all") {
        extractedProducts = await product.findAll();
        number = await product.countAll();
        findid = true;
    } else if (type === "homepage") {
        let extractedProducts1 = await product.findAll();
        for (let index = 0; index < 6; index++) {
            if (index > extractedProducts1.length) {
                break;
            }
            extractedProducts[index] = extractedProducts1[index];
        }
        number = extractedProducts1.length;
    } else if (type === "idorcategory") {

        if (string === "product" || string === "event" || string === "geographicalPlace" || string === "service" || string === "artisticArtefact" || string === "person") {
            extractedProducts = await product.findByCategory(string);
            // number = await product.countByCategory(string);

        } else {
            extractedProducts = await product.findById(string);
            findid = true;
        }
    } else if (type === "formfields") {
        if (string === "product" || string === "event" || string === "geographicalPlace" || string === "service" || string === "artisticArtefact" || string === "person") {
            let extractedProducts1 = await product.findFormFields(string);
            extractedProducts = extractedProducts1[0];
            // number = await product.countByCategory(string);

        } else {
            extractedProducts = await product.findById(string);
            findid = true;
        }
        number = 1;
    } else if (extractedProducts.length === 0) {
        number = "No product in this category."
    } else if (!extractedProducts.length > 0) {
        number = "Failed to extract product."
    } else {
        number = extractedProducts.length;
    }

    response.write(
        JSON.stringify({
            numberProducts: number,
            products:
            extractedProducts
        })
    );

    response.end();
}


async function getHandlerAuth(request, response) {
    const productImport = new ProductService();
    let responseBody;
    let userExists = false;
    let usernames = [];
    let username;
    let id;
    let extractedProducts = [];
    const authorizationHeader = request.headers.authorization;
    let number;
    try {
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            let token = authorizationHeader.substring(7);
            const decodedToken = jwt.verify(token, "secret");
            username = decodedToken['data']['username'];
        }


        try {
            usernames = await productImport.findByUsername(username);
        } catch (err) {
            userExists = false;
        }
        if (usernames.length > 0) {
            //    id=usernames[0]._id.toString();
            userExists = true;
        }
        if (userExists) {
            try {
                extractedProducts = await productImport.getUserByUsername(username);
                if (!extractedProducts.length > 0) {
                    number = "No products.";
                }
            } catch (err) {
                number = err.toString();
                alert(err);
            }
        }

        response.writeHead(200, {
            "Content-Type": "application/json",
        });
        response.write(
            JSON.stringify({
                numberProducts: number,
                products:
                extractedProducts
            })
        );
        response.end();
    } catch (e) {
        console.log(e);
    }
}


async function deleteHandlerAuth(request, response,id) {
    const productImport = new ProductService();
    let responseBody;
    let userExists = false;
    let usernames = [];
    let username;
    let extractedProducts = [];
    let chunks = [];
    let message="Form deleted.";
    const authorizationHeader = request.headers.authorization;
    try {
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            let token = authorizationHeader.substring(7);
            const decodedToken = jwt.verify(token, "secret");
            username = decodedToken['data']['username'];
            try {
                usernames = await productImport.findByUsername(username);
           userExists=true;
            } catch (err) {
                userExists = false;
            }
            if (usernames.length < 0) {

                userExists = false;
            }

            if (!userExists) {
                response.writeHead(404, {"Content-Type": "application/json"});
                response.end(JSON.stringify({message: "User Not Found.",route:"/"}));
             } else {
                 try {
            //         request.on("data", (chunk) => {
            //             chunks.push(chunk);
            //         });
            //         request.on("end", async () => {
            //             const data = Buffer.concat(chunks);
            //             const parsedData = JSON.parse(
            //                 data,
            //                 (key, value) => {
            //                     if (key === "id") {
            //                         id = value.toString();
            //                         return true;
            //                     }
            //                     return false;
            //                 }
            //             );
            //         });

                    await productImport.deleteById(username, id);
                } catch (err) {
                    alert(err);
                    message = "Failed At Deleting Form.";
                }
            }
        } else message = "Unauthorized To Delete.";
    }catch(err){
        message="Failed At Deleting Form.";
    }
    try{


    response.writeHead(200, {
        "Content-Type": "application/json",
        'Access-Control-Allow-Credentials': true
    });
    response.write(
        JSON.stringify({
            route: "/account",
            message: message,
        })
    );
    response.end();
}catch (err){}
}



async function patchHandlerAuth(request, response,id) {
    const productImport = new ProductService();
    let responseBody;
    let userExists = false;
    let usernames = [];
    let username;
    let extractedProducts = [];
    let chunks = [];
    let message="Form closed.";
    const authorizationHeader = request.headers.authorization;
    try {
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            let token = authorizationHeader.substring(7);
            const decodedToken = jwt.verify(token, "secret");
            username = decodedToken['data']['username'];
            try {
                usernames = await productImport.findByUsername(username);
                userExists=true;
            } catch (err) {
                userExists = false;
            }
            if (usernames.length < 0) {

                userExists = false;
            }

            if (!userExists) {
                response.writeHead(404, {"Content-Type": "application/json"});
                response.end(JSON.stringify({message: "User Not Found.",route:"/"}));
            } else {
                try {
                    await productImport.changeStatus(username, id);
                } catch (err) {
                    alert(err);
                    message = "Failed At Closing Form.";
                }
            }
        } else message = "Unauthorized To Close.";
    }catch(err){
        message="Failed At Deleting Form.";
    }
    try{


    response.writeHead(200, {
        "Content-Type": "application/json",
        'Access-Control-Allow-Credentials': true
    });
    response.write(
        JSON.stringify({
            route: "/account",
            message: message,
        })
    );
    response.end();
}
catch (err){

}
}


module.exports = {defaultHandler, postHandler, getHandler, getHandlerAuth, deleteHandlerAuth, patchHandlerAuth};