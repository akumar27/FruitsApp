var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('<h1>Hello Http</h1>');
});



console.log("Server is ready to listen on port 8080");
server.listen(8080);