const mongodb = require('mongodb')
const getDb = require('../utils/database').getDb

class User {
    constructor(username, password, email, age, occupation, password1) {
        this.username = username
        this.password = password
        this.email = email
        this.age = age
        this.occupation = occupation
        this.password1 = password1
    }

    static validatePasswordFormat(password) {
        return String(password).match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    }

    static validateUsernameFormat(username) {
        return String(username).toLowerCase().match(/^(([^$!{}<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))$/)
    }

    static validateEmailFormat(email) {
        return String(email).toLowerCase().match(/^(([^$!{}<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    }

    save() {
        const db = getDb()
        return db.collection('Users').insertOne(this)
    }

    static findAll() {
        const db = getDb()
        return db.collection('Users').find().toArray()
    }

    static findProducts(name) {
        const db = getDb()
        return db.collection('Products').find({username: name}).toArray()
    }

    static findById(id) {
        const db = getDb()
        return db.collection('Users').find({_id: id}).toArray()
    }

    static findByUsername(name) {
        const db = getDb()
        return db.collection('Users').find({username: name}).toArray()
    }

    static findByPassword(password) {
        const db = getDb()
        return db.collection('Users').find({password1: password}).toArray()
    }


    static remove(id) {
        const db = getDb()
        db.collection('Users').deleteOne({username: id})
    }

}

module.exports = User