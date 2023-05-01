const { productsRoute } = require('./productsRoute')
const { usersRoute } = require('./usersRoute')

async function router(req, res) {
    if (req.url === '/' || req.url.match(/([0-9a-zA-Z]+.html)/) || req.url.match(/^(\/[0-9a-zA-Z]+.html\?id=[0-9a-z]{24})$/) || req.url.match(/([0-9a-zA-Z]+.(css|js|png|jpg|pdf))/)) {
        console.log("[router] public route", req.url)
        productsRoute(req, res)
    } 
    else if (req.url === '/login-user') {
        console.log("[router] login-user api")
        usersRoute(req, res)
    } 
    else {
        console.log("[router] 404 error Page Not Found")
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: "Page not found" }))
    }
}

module.exports = {
    router
}