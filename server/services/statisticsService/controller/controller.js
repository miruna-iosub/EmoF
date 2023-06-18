const product = require("../models/product");
const {ProductMod} = require("../service/StatisticsServiceImplementation");
const {Product} = require("../models/product");
const {Form} = require("../models/form");

const DefaultFields = require("../models/fields");
const AllStatistics = require("../models/statistics");

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


async function defaultHandlerStats(request, response, reqUrl) {

    let responseBody = null;
    const qs = require('qs');
    let chunks = [];
    request.on("data", (chunk) => {
        chunks.push(chunk);
    });
    request.on("end", async () => {
            const data = Buffer.concat(chunks);
            //  const parsedData = qs.parse(data.toString());
            const productImport = new ProductMod();
            var token = null, productId = null, category = null;
            var formfields = [];
            var val = 0;
            // console.log(parsedData);
            // const parsedData = JSON.parse(
            //     data,
            //     (key, value) => {
            //         if (key === "token") {
            //             token = value;
            //             return true;
            //         } else if (key === "productid") {
            //             productId = value;
            //             return true;
            //         } else if (key === "category") {
            //             category = value;
            //             return true;
            //         }
            //         return false;
            //
            //     });

            productId = reqUrl.substring(12, reqUrl.lastIndexOf("/"));
            category = reqUrl.substring(reqUrl.lastIndexOf("/") + 1);
            console.log(category);
            /** if token exists
             let tokens;
             let userExists = false;
             let username;
             try {
                tokens = await productImport.findByToken(token);
                console.log(tokens);
            } catch (err) {
                userExists = false;
                responseBody = "Bad user info";
            }
             if (tokens.length > 0) {
                userExists = true;
            }
             if (userExists === false) {
                responseBody = "Bad user info";
            }
             **/
            /**verify product id**/

            let userExists = true;
            /**product statistics in category**/
            let extractedProducts;
            if (userExists) {
                try {
                    extractedProducts = await productImport.findByCategory(category);
                } catch (err) {
                    responseBody = err.toString();
                    alert(err);
                }
            }

            /**product default forms**/
            var existingFields = [];
            var allFields = [];
            let index = 0, index2 = 0;
            const defaultFields = new DefaultFields();
            if (userExists) {
                const fields = await productImport.findFormByObjectId(productId);//toate (doar 1)
                console.log(fields);
                if (fields[0] !== null) {
                    for (const field of fields[0].fields) {
                        if (category === "product") {
                            if (defaultFields.productFields.includes(field.toString())) {
                                existingFields[index] = field.toString();
                                index++;
                            }
                        } else if (category === "person") {
                            if (defaultFields.personFields.includes(field.toString())) {
                                existingFields[index] = field.toString();
                                index++;
                            }
                        } else if (category === "event") {
                            if (defaultFields.eventFields.includes(field.toString())) {
                                existingFields[index] = field.toString();
                                index++;
                            }
                        } else if (category === "geographicalPlace") {
                            if (defaultFields.geoPlaceFields.includes(field.toString())) {
                                existingFields[index] = field.toString();
                                index++;
                            }
                        } else if (category === "service") {
                            if (defaultFields.serviceFields.includes(field.toString())) {
                                existingFields[index] = field.toString();
                                index++;
                            }
                        } else if (category === "artisticArtefacts") {
                            if (defaultFields.artisticArtefactFields.includes(field.toString())) {
                                existingFields[index] = field.toString();
                                index++;
                            }
                        }
                        allFields[index2] = field.toString();
                        index2++;
                    }
                }
            }

            /**all stats**/
/// array with field names + array with objects for each field name and map with emotions
            var mapsOfEmotions = [];
            index = 0;
            /// get all from category & count values
            if (userExists) {
                const objects = await productImport.findReviewsByCategory(category);//toate (doar 1)

                for (const field of existingFields) {
                    mapsOfEmotions[index] = new AllStatistics(field);
                    index++;
                }

                for (const object of objects) {
                    index = 0;
                    for (const field of object.fieldsQuestions) {
                        if (existingFields.includes(field)) {
                            mapsOfEmotions[existingFields.indexOf(field)].addOneEmotion(object.fieldsEmotions[index]);
                        }
                        index++;
                    }
                }
            }
            console.log(mapsOfEmotions);


            /**prod stats**/

            var mapsOfEmotionsProduct = [];
            if (userExists) {
                let index3 = 0;
                for (const field1 of allFields) {
                    mapsOfEmotionsProduct[index3] = new AllStatistics(field1);
                    index3++;
                }

                const productReviews = await productImport.findReviewsByProductId(productId);// strange toate reviews de la produs si aduna emotiile individuale si comune
                for (const review of productReviews) {
                    let index4 = 0;
                    for (const emotion of review.fieldsEmotions) {
                        mapsOfEmotionsProduct[index4].addOneEmotion(emotion);
                        index4++;
                    }

                }
            }
            console.log(mapsOfEmotionsProduct);

            let arrayOfEmotionsMapsOnlyAll = [];
            for (let index = 0; index < mapsOfEmotions.length; index++) {
                arrayOfEmotionsMapsOnlyAll[index] = Object.fromEntries(mapsOfEmotions[index].mapEmotions);
            }
            let arrayOfEmotionsMapsOnlyProduct = [];
            for (let index = 0; index < mapsOfEmotionsProduct.length; index++) {
                arrayOfEmotionsMapsOnlyProduct[index] = Object.fromEntries(mapsOfEmotionsProduct[index].mapEmotions);
            }

            console.log(allFields);
            console.log(mapsOfEmotions);
            console.log(existingFields);
            console.log(mapsOfEmotions);


            /**matrix*/
            let emotions = ['vigilance', 'anticipation', 'interest', 'rage', 'anger',
                'annoyance', 'loathing', 'disgust', 'boredom', 'grief',
                'sadness', 'pensiveness', 'amazement', 'surprise', 'distraction',
                'terror', 'fear', 'apprehension', 'admiration',
                'trust', 'acceptance', 'ecstasy', 'joy', 'serenity'];

            let sumMatrixPoduct = [];
            for (let questionIndex = 0; questionIndex < allFields.length; questionIndex++) {
                sumMatrixPoduct[questionIndex] = [];
                for (let emotionIndex = 0; emotionIndex < 25; emotionIndex++) {
                    let number = mapsOfEmotionsProduct[questionIndex].mapEmotions.get(emotions[emotionIndex]);   //mostr left emption, most felt per question
                    if (number >= 0) {
                        sumMatrixPoduct[questionIndex][emotionIndex] = number;
                    } else {
                        sumMatrixPoduct[questionIndex][emotionIndex] = 0;
                    }
                }
            }
            let sumMatrixCategory = [];
            for (let questionIndex = 0; questionIndex < existingFields.length; questionIndex++) {
                sumMatrixCategory[questionIndex] = [];
                for (let emotionIndex = 0; emotionIndex < 25; emotionIndex++) {
                    let number = mapsOfEmotions[questionIndex].mapEmotions.get(emotions[emotionIndex]);   //mostr left emption, most felt per question
                    if (number >= 0) {
                        sumMatrixCategory[questionIndex][emotionIndex] = number;
                    } else {
                        sumMatrixCategory[questionIndex][emotionIndex] = 0;
                    }

                }
            }

            console.log(sumMatrixCategory.toString());
            console.log(sumMatrixPoduct.toString());

            /**most felt emotion per question??*/


            response.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            });


            response.write(
                JSON.stringify({
                    allFields: allFields,
                    mapsProduct: arrayOfEmotionsMapsOnlyProduct,
                    commonFields: existingFields,
                    mapsCategory: arrayOfEmotionsMapsOnlyAll,
                    matrixCategory: sumMatrixCategory,
                    matrixProduct:sumMatrixPoduct,
                })
            );
            response.end();
        }
    )
    ;

}


async function csvHandler(request, response) {
    let responseBody = null;
    const qs = require('qs');
    let chunks = [];
    request.on("data", (chunk) => {
        chunks.push(chunk);
    });
    request.on("end", async () => {

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


async function htmlHandler(request, response) {
    let responseBody = null;
    const qs = require('qs');
    let chunks = [];
    request.on("data", (chunk) => {
        chunks.push(chunk);
    });
    request.on("end", async () => {

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


// async function getHandler(request, response, type, string) {
//     let extractedProducts;
//     const product = new ProductMod();
//     let number;
//     let findid = false;
//     if (type === "all") {
//         extractedProducts = await product.findAll();
//         number = await product.countAll();
//     } else if (type === "idorcategory") {
//
//         if (string === "product" || string === "event" || string === "geographicalPlace" || string === "service" || string === "artisticArtefact") {
//             extractedProducts = await product.findByCategory(string);
//             // number = await product.countByCategory(string);
//
//         } else {
//             extractedProducts = await product.findById(string);
//             findid = true;
//         }
//     }
//     if (extractedProducts.length === 0) {
//         number = "No product in this category."
//     } else if (!extractedProducts.length > 0) {
//         number = "Failed to extract product."
//     } else {
//         number = extractedProducts.length;
//     }
//
//     console.log(extractedProducts);
//
//
//     response.writeHead(200, {
//         "Content-Type": "application/json",
//     });
//
//     response.write(
//         JSON.stringify({
//             numberProducts: number,
//             extractedProducts
//         })
//     );
//
//     response.end();
// }

module.exports = {defaultHandler, defaultHandlerStats};