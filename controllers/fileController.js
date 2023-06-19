const fs = require('fs')
const path = require('path')

async function fileHandling(req, res) {

    if (req.url.match(/([0-9a-zA-Z]*.html\?id=[0-9a-z]+)/)) {
        req.url = 'products-unlogged.html'
    }

    // file path
    let filePath = path.join(
        'pages',
        req.url === '/' ? 'homepage-unloggedin.html' : req.url)


    //file extension
    let extname = path.extname(filePath)

    //default content type
    let contentType = 'text/html'

    //check ext and set content type
    switch (extname) {
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            filePath = path.join('scripts', req.url)
            contentType = 'text/javascript'
            break
        case '.json':
            contentType = 'application/json'
            break
        case '.png':
            filePath = path.join('pages', 'images', req.url)
            contentType = 'image/png'
            break
        case '.jpg':
            filePath = path.join('pages', 'images', req.url)
            contentType = 'image/jpg'
            break
        case '.pdf':
            contentType = 'application/pdf'
            break
    }

    // read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                // page not found
                fs.readFile(path.join('pages', 'homepage-unloggedin.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(content, 'utf8')
                })
            } else {
                // server error
                res.writeHead(500)
                res.end(`Server Error: ${err.code}`)
            }
        } else {

            res.writeHead(200, contentType)
            res.end(content, 'utf8')
        }
    })
}

module.exports = {
    fileHandling
}