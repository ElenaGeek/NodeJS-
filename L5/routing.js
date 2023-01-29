const http = require('http');
const url = require('url');
const fs = require('fs');
const findRoute = require('./routing.js');
const routes = require('./routes/index.js');

const host = 'localhost'
const port = 3000

const server = http.createServer((req, res) => {
    if (['GET', 'POST', 'PUT'].includes(req.method)) {
        const queryParams = url.parse(req.url, true).query
        const routeParams = findRoute(req.url.split('?')[0], routes)
        res.setHeader('Content-Type', 'application/json')

        const [ endpoint, params ] = routeParams;

        let data = ''
        req.on('data', (chunk) => {
            data += chunk
        })

        req.on('end', () => {
            let result
            let body
            try {
                body = JSON.parse(data)
            } catch(e) {}

            const method = req.method.toLocaleLowerCase()
            if (endpoint && typeof endpoint[method] === 'function') {
                result = endpoint[method](params, queryParams, body)
                res.end(JSON.stringify(result))
            } else if(endpoint === null) {
                res.statusCode = 404
                res.end(JSON.stringify({error: "Not found"}))
            } else {
                res.statusCode = 405
                res.end(JSON.stringify({error: "Not allowed"}))
            }
        })

    }
})

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`));