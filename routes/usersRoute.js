const login = require("../server/services/loginService/loginController");

function usersRoute(req, res) {

    if (req.url === '/login' && req.method === 'POST') {
        login.postHandler(req, res)
    } else if (req.url === '/add-user' && req.method === 'POST') { // register
        saveUser(req, res)
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(JSON.stringify({message: 'Route Not Found'}))
    }
}

module.exports = {
    usersRoute
}