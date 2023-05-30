const dotenv = require('dotenv')
dotenv.config()

const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const Config = require("./config");


let _database

const mongodbConnect = (callback) => {
    const config = new Config();

    mongoClient
        .connect(
        `mongodb+srv://${config['db_username']}:${config['db_password']}@cluster.5nyiyva.mongodb.net/?retryWrites=true&w=majority`)
        .then(client => {
            _database = client.db(config['db'])
            console.log("[database] Connected to mongodb database!")
            callback()
        })
        .catch(err => {
            console.log(err)
            throw err
        })
}

const getDb = () => {
    if(_database) {
        return _database
    }
    else {
        console.log('No database found!AAAAAAAAAAAAAAAAAA')
    }
}

exports.mongodbConnect = mongodbConnect
exports.getDb = getDb