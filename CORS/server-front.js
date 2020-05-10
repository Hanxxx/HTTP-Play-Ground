const http = require('http');
const fs = require('fs')
let port = 8888

http.createServer(function (request, response) {
   console.log('request come', request.url);
   const html = fs.readFileSync('test.html', 'utf8')
   response.writeHead(200, {
      'Content-Type': 'text/html'
   })
   response.end(html); 
}).listen(port);

console.log('server created, listening ', port);