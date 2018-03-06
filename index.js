var http = require('http');
var rest = require('./restapi');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    //handle url breakdown and set options

    var options = {
        host: 'api.github.com',
        port: 443,
        path: '/users/karagenit',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'karagenit'
        }
    };

    rest.getJSON(options, function(statusCode, result) {
        res.end(JSON.stringify(result));
    });
}).listen(8080);
