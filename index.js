var http = require('http');
var rest = require('./restapi');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello!!');
}).listen(8080);
