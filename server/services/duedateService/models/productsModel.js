const mongo = require('mongodb');
const ObjectId = mongo.ObjectId;
class Product {
    _id;
    username;
    name;
    description;
    type;
    picture;
    status;
    expirationdate;
    category;
    subcategory;
    formfieldsid;
    constructor(username, name, description, type, picture, status, expirationdate, category, subcategory) {
        this._id=new ObjectId();
        this.username = username;
        this.name = name;
        this.description = description;
        this.type = type;
        this.picture = picture;
        this.status = status;
        this.expirationdate = expirationdate;
        this.category = category;
        this.subcategory = subcategory;
    }

    static findByStatus(stat) {
        const db = getDb()
        return db.collection('Products').find({ status: stat }).toArray()
    }

    setFormFieldsId(formfieldsid) {
        this.formfieldsid = formfieldsid;
    }

}

module.exports = { Product };