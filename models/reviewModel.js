
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const getDb = require('../utils/database').getDb

class Review {

    constructor(username, category, productid, fieldsQuestions, fieldsEmotions) {
        this.username = username;
        this.category = category;
        this.productid = productid;
        this.fieldsQuestions = fieldsQuestions;
        this.fieldsEmotions = fieldsEmotions;
    }

    async save() {
        const db = getDb();
        try {
            db.collection('Reviews').insertOne(this);
        } catch (err) {
            console.log("[Error1]: " + e);
        }
    }

    static findById(id) {
        const db = getDb();
        try {
            return db.collection('FormFields').find({_id: new mongodb.ObjectId(id)}).toArray();
        } catch (e) {
            console.log("[Error1]: " + e);
        }
        return false;
    }


    static findAll(prodId) {
        const db = getDb()
        try{
        return db.collection('FormFields').find({productId: new mongodb.ObjectId(prodId)}).toArray()
        } catch (e) {
            console.log("[Error3]: " + e);
        }
        return false;
    }


    static remove(id) {
        const db = getDb()
        try{
        db.collection('Reviews').deleteOne({_id: new mongodb.ObjectId(id)})
        } catch (e) {
            console.log("[Error4]: " + e);
        }
        return false;
    }
}

module.exports = Review



/*const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
const getDb = require('../utils/database').getDb

class Review {
        constructor(userId, prodId, questions) {
            this.userId = userId;
            this.prodId = prodId;
            this.questions = questions;
        }
    
    

    save() {
        const db = getDb()
        return db.collection('Reviews').insertOne(this)
    }

    static findAll() {
        const db = getDb()
        return db.collection('Reviews').find().toArray()
    }

    static findById(id) {
        const db = getDb()
        return db.collection('Reviews').find({ _id: new mongodb.ObjectId(id) }).toArray()
    }

    static findByUsername(name) {
        const db = getDb()
        return db.collection('Reviews').find({ username: name }).toArray()
    }

    static remove(id) {
        const db = getDb()
        db.collection('Reviews').deleteOne({ _id: new mongodb.ObjectId(id) })
    }

}

module.exports = Review*/