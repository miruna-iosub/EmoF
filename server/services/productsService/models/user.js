const mongo = require('mongodb');
const ObjectId = mongo.ObjectId;

class User {
    _id;
    username;
    password;
    email;
    age
    occupation;
    password1;

    constructor(username, password, email, age, occupation, password1) {

        this.username = username;
        this.password = password;
        this.email = email;
        this.age = age;
        this.occupation = occupation;
        this.password1 = password1;
    }
}


module.exports = {User};