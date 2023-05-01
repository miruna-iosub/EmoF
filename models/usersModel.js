const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
const getDb = require('../utils/database').getDb

class User {
    constructor(username, password, email) {
        this.username = username
        this.password = password
    }
    static validatePasswordFormat(password) {
        return String(password).match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    }

    static validateUsernameFormat(username) {
        return String(username).toLowerCase().match(/^(([^$!{}<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))$/)
    }

    save() {
        const db = getDb()
        return db.collection('Users').insertOne(this)
    }

    static findAll() {
        const db = getDb()
        return db.collection('Users').find().toArray()
    }

    static findById(id) {
        const db = getDb()
        return db.collection('Users').find({ _id: new mongodb.ObjectId(id) }).toArray()
    }

    static findByUsername(name) {
        const db = getDb()
        return db.collection('Users').find({ username: name }).toArray()
    }

    static remove(id) {
        const db = getDb()
        db.collection('Users').deleteOne({ _id: new mongodb.ObjectId(id) })
    }

}

module.exports = User