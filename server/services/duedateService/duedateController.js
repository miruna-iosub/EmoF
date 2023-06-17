var url = require("url");
var fs = require("fs");
var qs = require("querystring");
const User = require("./models/usersModel");
const Product = require("./models/productsModel");

const getDb = require("./database/database").getDb;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function dateHandler(request, response) {
  console.log("[ duedate handler ]");

  let chunks = [];
  let ongoingProducts = "";
  request.on("data", (chunk) => {
    chunks.push(chunk);
  });

  request.on("end", async () => {
    try {
      const db = getDb();

      const currentDate = new Date();
      const ongoingProducts = await db
        .collection("Products")
        .find({ status: "ongoing" })
        .toArray();
      const expiredProducts = [];
      var index = 0;

      for (const product of ongoingProducts) {
        //  console.log(`Product ID: ${product._id}, Status: ${product.status}, Expiration: ${product.expirationdate}`);

        const expirationDate = new Date(product.expirationdate);
        // console.log("expirationDate: " + expirationDate)
        //console.log("currentDate: " + currentDate)
        if (expirationDate < currentDate) {
          expiredProducts.push(product);
          index++;
        }
      }

      for (const products of expiredProducts) {
        console.log(
          `Product ID: ${products._id}, Status: ${products.status}, Expiration: ${products.expirationdate}`
        );

        const db = getDb();

        db.collection("Products").updateOne(
          { _id: products._id }, // Filter condition
          {
            $set: {
              status: "closed",
            },
          }
        );
      }
      console.log("Expired products:", expiredProducts);

      response.end();
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = { dateHandler };
