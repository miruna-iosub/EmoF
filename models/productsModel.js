const mongo = require('mongo')
const ObjectId = mongo.ObjectId
const getDb = require('../utils/database').getDb

class Product {
    static findByName(_name) {
        const db = getDb()
        return db.collection('Products').find({ name: _name }).toArray()
    }

    save() {
        const db = getDb()
        return db.collection('Products').insertOne(this)
    }

    static findAll() {
        const db = getDb()
        return db.collection('Products').find().toArray()
    }

    static findByUserId(userId) {
        const db = getDb()
        return db.collection('Users').find({ _id: new mongo.ObjectId(userId)}).toArray()
    }

    static findById(id) {
        const db = getDb()
        return db.collection('Products').find({_id: new mongo.ObjectId(id)}).toArray()
    }
}

module.exports = Product

