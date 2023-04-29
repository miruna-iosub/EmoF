const {loginUser} = require('./usersController')

function usersRoute(req, res) {
    if(req.url === '/signin' && req.method === 'POST') {
        loginUser(req, res)
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(JSON.stringify({message: 'Route Not Found'}))
    }
}

module.exports = {
    usersRoute
}