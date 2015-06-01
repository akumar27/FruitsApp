var http = require('http');

var server = http.createServer(function(req, res) {
console.log("Inside first request");
  res.writeHead(200);
  res.end('Hello Http');
});

console.log("server up and running");
server.listen(8080);