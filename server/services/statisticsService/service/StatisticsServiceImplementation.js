const mongo = require('mongodb');
const {Product} = require('../models/product');
const {BadProductError, BadFormError, UserInfoError} = require("../models/exception");
const ObjectId = mongo.ObjectId;
const getDb = require('../database/database').getDb;

class ProductMod {

    async findByName(givenName) {
        const db = getDb();
        return db.collection('Products').find({name: givenName}).toArray();
    }

    async findByUsername(givenUsername) {
        const db = getDb();
        try {
            return db.collection('Users').find({username: givenUsername}).toArray();
        } catch (e) {
            console.log("[Error]: " + e);
            throw new UserInfoError();
        }

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

        //    db.collection('FormFields').insertOne(givenFields);
    }

    async putForm(givenFields) {
        const db = getDb();
        console.log(givenFields);
        try {
            db.collection('FormFields').insertOne(givenFields);
        } catch (err) {
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

    async findFormByObjectId(productIdd) {
        const db = getDb();
        try {
            return db.collection('FormFields').find({productid: new ObjectId(productIdd)}).toArray();
        } catch (e) {
            console.log("[Error]: " + e);
        }

    }

    async findReviewsByCategory(givenCategory) {
        const db = getDb();
        try {
            return db.collection('Reviews').find({category: givenCategory}).toArray();
        } catch (e) {
            console.log("[Error]: " + e);
        }

    }

    async findReviewsByProductId(productId) {
        const db = getDb();
        try {
            return db.collection('Reviews').find({productid: new ObjectId(productId)}).toArray();
        } catch (e) {
            console.log("[Error]: " + e);
        }
    }
}

module.exports = {ProductMod};
