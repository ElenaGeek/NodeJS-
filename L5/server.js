const http = require('http');
const url = require('url');
const fs = require('fs');

const host = 'localhost'
const port = 3000

//const url = 'http://localhost:3000/user?param1=1&param2=2';

const server = http.createServer((request, response) => {

// Simple Print  
response.end('Hello world!')   

/*// Print Header
    response.setHeader('Content-Type', 'text/html')
    response.setHeader('SomeCustomerHeader', 'value test')
    response.writeHead(200, {
        'Some': 'value test'
    })
    response.end('<h1>Hello world!</h1>')
*/

/*// Get parameters
    if (request.method === 'GET') {
        const queryParams = url.parse(request.url, true)
        console.log(queryParams);
        response.end(JSON.stringify(queryParams))
    } else {
        response.statusCode = 405
        response.end('Method not allowed')
    }
*/

/*// Post data 
if (request.method === 'POST') {
    response.writeHead(200, {"Content-Type": "application/json"})

    let data = '';
    request.on('data', (chunk) => {
        data += chunk
    })

    request.on('end', () => {
        try {
            const body = JSON.parse(data)
            console.log(body)

            response.end(data)
        } catch(e) {
            console.error(e.message)
        }
    })
    response.end(data)
}
*/

/*// Read the file 

//Open a file on the server and return its content:
        fs.readFile('demo.html', function(err, data) {
        response.writeHead(200, {'Content-Type': 'text.html'});
        response.write(data);
        return response.end();
    });

    request.on('data', (chunk) => {
        data += chunk;
        console.log(data);
    });

    request.on('end', () => {
        response.end();
    });
*/

})

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`));
