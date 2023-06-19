const product = require("../models/product");
const {ProductMod} = require("../service/StatisticsServiceImplementation");
const {Product} = require("../models/product");
const {Form} = require("../models/form");

const DefaultFields = require("../models/fields");
const AllStatistics = require("../models/statistics");
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
            productId = reqUrl.substring(19, reqUrl.lastIndexOf("/"));
            category = reqUrl.substring(reqUrl.lastIndexOf("/") + 1);
            console.log(category);
            let userExists = false;
            let username;
            let usernames = [];
            const authorizationHeader = request.headers.authorization;

            try {
                if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
                    let token = authorizationHeader.substring(7);
                    const decodedToken = jwt.verify(token, "secret");
                    username = decodedToken['data']['username'];
                }


                try {
                    usernames = await productImport.findByUsername(username);
                    userExists = true;
                } catch (err) {
                    userExists = false;
                }
                if (usernames.length > 0) {
                    userExists = true;
                }
            } catch (err) {
                response.write(
                    JSON.stringify({
                        message: "Unauthorised."
                    }))
            }

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
                    try {
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
                    } catch (e) {
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

                try {


                    const productReviews = await productImport.findReviewsByProductId(productId);// strange toate reviews de la produs si aduna emotiile individuale si comune
                    for (const review of productReviews) {
                        let index4 = 0;
                        for (let emotion of review.fieldsEmotions) {
                            mapsOfEmotionsProduct[index4].addOneEmotion(emotion);
                            index4++;
                        }
                    }
                } catch (e) {
                    console.log(e);
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
            console.log(mapsOfEmotionsProduct);
            console.log(existingFields);
            console.log(mapsOfEmotions);


            /**matrix*/
            let emotions = ['vigilance', 'anticipation', 'interest', 'rage', 'anger',
                'annoyance', 'loathing', 'disgust', 'boredom', 'grief',
                'sadness', 'pensiveness', 'amazement', 'surprise', 'distraction',
                'terror', 'fear', 'apprehension', 'admiration',
                'trust', 'acceptance', 'ecstasy', 'joy', 'serenity'];

            let sumMatrixProduct = [];
            for (let questionIndex = 0; questionIndex < allFields.length; questionIndex++) {
                sumMatrixProduct[questionIndex] = [];
                for (let emotionIndex = 0; emotionIndex < 24; emotionIndex++) {
                    let number = mapsOfEmotionsProduct[questionIndex].mapEmotions.get(emotions[emotionIndex]);   //mostr left emption, most felt per question
                    if (number >= 0) {
                        sumMatrixProduct[questionIndex][emotionIndex] = number;
                    } else {
                        sumMatrixProduct[questionIndex][emotionIndex] = 0;
                    }
                }
            }
            let sumMatrixCategory = [];
            for (let questionIndex = 0; questionIndex < existingFields.length; questionIndex++) {
                sumMatrixCategory[questionIndex] = [];
                for (let emotionIndex = 0; emotionIndex < 24; emotionIndex++) {
                    let number = mapsOfEmotions[questionIndex].mapEmotions.get(emotions[emotionIndex]);   //mostr left emption, most felt per question
                    if (number >= 0) {
                        sumMatrixCategory[questionIndex][emotionIndex] = number;
                    } else {
                        sumMatrixCategory[questionIndex][emotionIndex] = 0;
                    }

                }
            }

            /**most felt emotion per question??*/
            let mostFeltEmotionPerQuestionProduct = [];
            for (let indexQuestion = 0; indexQuestion < allFields.length; indexQuestion++) {
                let max = 0;
                let emotion = "";
                for (let indexEmotion = 0; indexEmotion < 24; indexEmotion++) {
                    if (max <= sumMatrixProduct[indexQuestion][indexEmotion]) {
                        max = sumMatrixProduct[indexQuestion][indexEmotion];
                        emotion = emotions[indexEmotion];
                    }
                }
                mostFeltEmotionPerQuestionProduct[indexQuestion] = [emotion, max.toString()];

            }

            let mostFeltEmotionPerQuestionCategory = [];  // question + most felt emotion
            for (let indexQuestion = 0; indexQuestion < existingFields.length; indexQuestion++) {
                let max = 0;
                let emotion = "";
                for (let indexEmotion = 0; indexEmotion < 24; indexEmotion++) {

                    if (max <= sumMatrixCategory[indexQuestion][indexEmotion]) {
                        max = sumMatrixCategory[indexQuestion][indexEmotion];
                        emotion = emotions[indexEmotion];
                    }
                }
                mostFeltEmotionPerQuestionCategory[indexQuestion] = [emotion, max.toString()];

            }


            /**total number of reviews**/
            let totalNumberOfReviewsCategory = 1;
            for (let indexEmotion = 0; indexEmotion < 24; indexEmotion++) {
                totalNumberOfReviewsCategory += sumMatrixCategory[0][indexEmotion];
            }
            let totalNumberOfReviewsProduct = 1;
            for (let indexEmotion = 0; indexEmotion < 24; indexEmotion++) {
                totalNumberOfReviewsProduct += sumMatrixProduct[0][indexEmotion];
            }

            /**emotions percent**/

            let percentMatrixProduct = [];
            let percentMatrixProductWith = [];
            for (let questionIndex = 0; questionIndex < existingFields.length; questionIndex++) {
                percentMatrixProduct[questionIndex] = [];
                percentMatrixProductWith[questionIndex] = [];
                for (let emotionIndex = 0; emotionIndex < 24; emotionIndex++) {
                    if (totalNumberOfReviewsCategory > 0 && sumMatrixProduct[questionIndex][emotionIndex] > 0) {
                        percentMatrixProduct[questionIndex][emotionIndex] = (sumMatrixProduct[questionIndex][emotionIndex] / totalNumberOfReviewsCategory).toFixed(3);
                        percentMatrixProductWith[questionIndex][emotionIndex] = percentMatrixProduct[questionIndex][emotionIndex].toString() + '%';
                    } else {
                        percentMatrixProduct[questionIndex][emotionIndex] = 0;
                        percentMatrixProductWith[questionIndex][emotionIndex] = 0;

                    }
                }

            }
            let percentMatrixCategoryWith = [];
            let percentMatrixCategory = [];
            for (let questionIndex = 0; questionIndex < existingFields.length; questionIndex++) {
                percentMatrixCategory[questionIndex] = [];
                percentMatrixCategoryWith[questionIndex] = [];
                for (let emotionIndex = 0; emotionIndex < 24; emotionIndex++) {
                    if (totalNumberOfReviewsCategory > 0 && sumMatrixCategory[questionIndex][emotionIndex]) {
                        percentMatrixCategory[questionIndex][emotionIndex] = (sumMatrixCategory[questionIndex][emotionIndex] / totalNumberOfReviewsCategory).toFixed(3);
                        percentMatrixCategoryWith[questionIndex][emotionIndex] = percentMatrixCategory[questionIndex][emotionIndex].toString() + '%';
                    } else {
                        percentMatrixCategory[questionIndex][emotionIndex] = 0;
                        percentMatrixCategoryWith[questionIndex][emotionIndex] = 0;
                    }
                }
            }


            //    console.log("mostFeltEmotionPerQuestionProduct: " + mostFeltEmotionPerQuestionProduct.toString());
            //    console.log("mostFeltEmotionPerQuestionCategory: " + mostFeltEmotionPerQuestionCategory.toString())
            //   console.log("totalNumberOfReviewsProduct: " + totalNumberOfReviewsProduct.toString());
            //   console.log("totalNumberOfReviewsCategory: " + totalNumberOfReviewsCategory.toString());
            //  console.log("percentMatrixProduct: " + percentMatrixProduct.toString());
            //  console.log("percentMatrixCategory: " + percentMatrixCategory.toString());
            response.writeHead(200, {
                "Content-Type": "application/json",
            });


            response.write(
                JSON.stringify({
                    allFields: allFields,
                    mapsProduct: arrayOfEmotionsMapsOnlyProduct,
                    commonFields: existingFields,
                    mapsCategory: arrayOfEmotionsMapsOnlyAll,
                    matrixCategory: sumMatrixCategory, //count
                    matrixProduct: sumMatrixProduct,
                    arrayOfEmotions: emotions,
                    mostFeltEmotionPerQuestionProduct: mostFeltEmotionPerQuestionProduct, //[emotie, cate]
                    mostFeltEmotionPerQuestionCategory: mostFeltEmotionPerQuestionCategory,
                    totalNumberOfReviewsCategory: totalNumberOfReviewsCategory,
                    totalNumberOfReviewsProduct: totalNumberOfReviewsProduct,
                    percentMatrixProduct: percentMatrixProduct,
                    percentMatrixCategory: percentMatrixCategory,
                    percentMatrixProductWith: percentMatrixProductWith, // %
                    percentMatrixCategoryWith: percentMatrixCategoryWith,
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


module.exports = {defaultHandler, defaultHandlerStats};