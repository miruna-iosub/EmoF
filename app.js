const http = require('http')
const { router } = require('./routes/router')
const mongodbConnect = require('./utils/database').mongodbConnect
require("dotenv").config();


mongodbConnect(async () => {
    server.listen(4000, () => console.log(`[server] Server running on port ${4000}`))
}) 

const server = http.createServer((req, res) => {
    console.log("@iao")

})
