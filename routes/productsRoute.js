const { fileRouter } = require('./filesRoute')

function productsRoute(req, res) {
    
    if(req.url === '/' || req.url.match(/([0-9a-zA-Z]+.html)/) || req.url.match(/^(\/[0-9a-zA-Z]+.html\?id=[0-9a-z]{24})$/) || req.url.match(/([0-9a-zA-Z]+.(css|js|png|jpg|pdf))/) && req.method === 'GET') {
        fileRouter(req, res)
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(JSON.stringify({message: 'Route Not Found'}))
    }
}

module.exports = {
    productsRoute
}