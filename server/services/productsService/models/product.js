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
    category;
    subcategory;
    formfieldsid;
    constructor(username, name, description, type, picture, status, category, subcategory) {
        this._id=new ObjectId();
        this.username = username;
        this.name = name;
        this.description = description;
        this.type = type;
        this.picture = picture;
        this.status = status;
        this.category = category;
        this.subcategory = subcategory;
    }



    // constructor(userid,
    //     name,
    //     description,
    //     type,
    //     picture,
    //     status,
    //     category,
    //     subcategory,
    //     formfieldsid) {
    //
    //
    //     this.userid = userid;
    //     this.name = name;
    //     this.description = description;
    //     this.type = type;
    //     this.picture = picture;
    //     this.status = status;
    //     this.category = category;
    //     this.subcategory = subcategory;
    //     this.formfieldsid = formfieldsid;
    // }

    setFormFieldsId(formfieldsid) {
        this.formfieldsid = formfieldsid;
    }

}

module.exports = { Product };