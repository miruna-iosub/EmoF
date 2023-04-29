const postgres = require('pg')
const ObjectId = postgres.ObjectId
const getDb = require('../utils/database').getDb

class User {
    constructor(username, password) {
        this.username = username
        this.password = password
    }
    // sanitizare
    static validatePasswordFormat(password) {
        return String(password).match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    }

    static validateUsernameFormat(username) {
        return String(username).toLowerCase().match(/^(([^$!{}<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))$/)
    }

    save() {
        const db = getDb()
        return db.collection('users').insertOne(this)
    }

    static findAll() {
        const db = getDb()
        return db.collection('users').find().toArray()
    }

    static findById(id) {
        const db = getDb()
        return db.collection('users').find({ _id: new postgres.ObjectId(id) }).toArray()
    }

    static findByUsername(name) {
        const db = getDb()
        return db.collection('users').find({ username: name }).toArray()
    }

    static remove(id) {
        const db = getDb()

        db.collection('users').deleteOne({ _id: new postgres.ObjectId(id) })
    }

}

module.exports = User