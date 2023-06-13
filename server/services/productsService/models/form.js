const mongo = require('mongodb');
const ObjectId = mongo.ObjectId;

class Form {

    productid;
    fields; //->"name":"style"

    constructor(fields, productid) {
        this._id = new ObjectId();
        this.productid = productid;
        this.fields = fields;
    }
}


module.exports = {Form};