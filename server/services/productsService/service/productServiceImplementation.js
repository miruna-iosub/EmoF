const mongo = require('mongodb');
const {Product} = require('../models/product');
const {User} = require('../models/user');
const {Token} = require('../models/token');
const {BadProductError, BadFormError,UserInfoError} = require("../models/exception");
const ObjectId = mongo.ObjectId;
const getDb = require('../database/database').getDb;

class ProductService {

    async findByName(givenName) {
        const db = getDb();
        return db.collection('Products').find({name: givenName}).toArray();
    }


    async findAll() {
        const db = getDb();
        try {
            return db.collection('Products').find().toArray();
        } catch (e) {
            console.log("[Error]: " + e);
        }
        return false;
    }
    async findFirst() {
        const db = getDb();
        try {
            return db.collection('Products').find().toArray();
        } catch (e) {
            console.log("[Error]: " + e);
        }
        return false;
    }


    async findById(id) {
        const db = getDb();
        try {
            return db.collection('Products').find({_id: new mongo.ObjectId(id)}).toArray();
        } catch (e) {
            console.log("[Error]: " + e);
        }
        return false;
    }

    async findByCategory(givenCategory) {
        const db = getDb();
        try {
            return db.collection('Products').find({category: givenCategory}).toArray();
        } catch (e) {
            console.log("[Error]: " + e);
        }
        return false;
    }

    async countAll() {
        const db = getDb();
        try {
            return db.collection('Products').find().toArray().length;
        } catch (e) {
            console.log("[Error]: " + e);
            return 0;
        }

    }

    async countByCategory(givenCategory) {
        const db = getDb();
        try {

            return db.collection('Products').find({category: givenCategory}).toArray().size();
        } catch (e) {
            console.log("[Error]: " + e);
            return 0;
        }
    }

    async putObject(givenProduct) {
        const db = getDb();
        console.log(givenProduct);
        try {
            db.collection('Products').insertOne(givenProduct);
        } catch (err) {
            throw new BadProductError();
        }

    }

    async putForm(givenFields) {
        const db = getDb();
        console.log(givenFields);
        try {
            db.collection('FormFields').insertOne(givenFields);
        } catch (err) {
            console.log("[Error]: " + err);
            throw new BadFormError();
        }
    }

    async findByToken(givenToken) {
        const db = getDb();
        try {
            return db.collection('Tokens').find({token: givenToken}).toArray();
        } catch (e) {
            console.log("[Error]: " + e);
            throw new UserInfoError();
        }

    }

    async findFormFields(string) {
        const db = getDb();
        try {
            return db.collection('DefaultFormFields').find({productcategory:string}).toArray();
        } catch (e) {
            console.log("[Error]: " + e);
            throw new UserInfoError();
        }
    }
}

module.exports = {ProductService};


//
// tokenUsername(givenToken, givenUsername) {
//     const db = getDb();
//     let error = false;
//     var ok = db.collection('Tokens').find({
//         name: 'Test User'
//     }).toArray((err, result) => {
//         if (err) {
//             error = true;
//             return false;
//         }
//         return true;
//     });
//     for(let i=0;i<ok.length;i++){
//         if(ok.get(i).username===givenUsername)
//             return true;
//     }
//     return false;
// }
//
//
//
// tokenUsername(givenToken, givenUsername) {
//
//     var collection = db.collection('Tokens');  // get reference to the collection
//     collection.find({username: givenUsername}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
//     {
//         if(docs.length > 0) //if exists
//         {
//             console.log(docs); // print out what it sends back
//         }
//         else // if it does not
//         {
//             console.log("Not in docs");
//         }
//     });
//     return false;
//
//
//
//
//
// }
// //     const db = getDb();
// //     let error = false;
// //     var ok = db.collection('Tokens').find({
// //         token: givenToken
// //     }).toArray((err, result) => {
// //
// //         if (err) {
// //             error = true;
// //             return false;
// //         }
// //         return true;
// //
// //     });
// //     return ok.length > 0;
// // }
//
// //     try {
// //         let exists= db.collection("Tokens").find(
// //             {token: givenToken}, {username: givenUsername})
// //            .length;
// //         if(exists>0) {
// //             return true;
// //         }
// //     } catch (err) {
// //         return false;
// //     }
// //     return false;
// // }
//
// //     let cv = false;
// //     db.collection('Tokens').find({token: givenToken}).toArray(function(error, result){
// //      console.log(givenToken+" "+result.token);
// //      console.log(givenUsername+" "+result.username);
// //        if (!error&&result.username===givenUsername) {
// //      //
// //            cv=true;
// //            return true;
// //        } else {
// //            return false;
// //        }
// //    });
// //     return cv;
// //     //return false;
// // } catch (e) {
// //    return false;
// // }
// //return false;
// //  }