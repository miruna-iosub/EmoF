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
            return db.collection('Products').find({status:"ongoing"}).toArray();
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
            return db.collection('Products').find({category: givenCategory,status:"ongoing"}).toArray();
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
        try {
            db.collection('Products').insertOne(givenProduct);
        } catch (err) {
            throw new BadProductError();
        }

    }

    async putForm(givenFields) {
        const db = getDb();
        try {
            db.collection('FormFields').insertOne(givenFields);
        } catch (err) {
            console.log("[Error]: " + err);
            throw new BadFormError();
        }
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

    async findFormFields(string) {
        const db = getDb();
        try {
            return db.collection('DefaultFormFields').find({productcategory:string}).toArray();
        } catch (e) {
            console.log("[Error]: " + e);
            throw new UserInfoError();
        }
    }

    async getUserByUsername(givenUsername) {
        const db = getDb();
        try {
            return db.collection('Products').find({username:givenUsername}).toArray();
        } catch (e) {
            console.log("[Error]: " + e);
            throw new UserInfoError();
        }
    }

    async deleteById(givenUsername,prodId){
        const db = getDb();
        try {
            db.collection('Products').deleteOne({username:givenUsername,_id: new mongo.ObjectId(prodId)});
        } catch (e) {
            console.log("[Error]: " + e);
            throw new UserInfoError();
        }
    }
    async changeStatus(givenUsername,prodId){
        const filter = { _id: new mongo.ObjectId(prodId),username:givenUsername };
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${year}/${month}/${day}`;
        const updateDocument = {
            $set: {
                status: "closed",
                expirationdate:currentDate,
            },
        };
        const db = getDb();
        try {
            db.collection('Products').updateOne(filter, updateDocument);
        } catch (e) {
            console.log("[Error]: " + e);
            throw new UserInfoError();
        }
    }


}

module.exports = {ProductService};
