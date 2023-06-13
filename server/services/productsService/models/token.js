const mongo = require('mongodb');
const ObjectId = mongo.ObjectId;
class Token {
    _id;
    createdAt;
    token;
    cont_id;

    // constructor(createdAt, token, cont_id) {
    //     this._id = new ObjectId();
    //     this.createdAt=createdAt;
    //     this.token = token;
    //     this.cont_id = cont_id;
    // }
}
module.exports = { Token };