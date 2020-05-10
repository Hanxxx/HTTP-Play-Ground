const http = require('http');
let port = 8887
http.createServer(function (request, response) {
   console.log('request come', request.url);

   response.writeHead(200, {
      'Access-Control-Allow-Origin': 'http://localhost:8888',
      // 'Access-Control-Allow-Headers': 'X-Test-Cors'
   })

   response.end('123'); 
}).listen(port);

console.log('server created, listening ', port);