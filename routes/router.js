const { usersRoute } = require('./usersRoute')

async function router(req, res) {
    if (req.url === '/signin') {
        console.log("[router] signin api")
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