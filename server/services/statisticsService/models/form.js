const mongo = require('mongodb');
const ObjectId = mongo.ObjectId;

class Form {

    productid;
    fields; //->"name":"style"

    constructor(fields, productidd) {
        this._id = new ObjectId();
        this.productid = productidd;
        this.fields = fields;
    }
}


module.exports = {Form};