var http = require('http');
var rest = require('./restapi');
var fs   = require('fs');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    var token = fs.readFileSync('tba.token', 'utf8').trim();

    //handle url breakdown and set options

    var options = {
        host: 'www.thebluealliance.com',
        port: 443,
        path: '/api/v3/team/frc868',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'frc868',
            'X-TBA-Auth-Key': token
        }
    };

    rest.getJSON(options, function(statusCode, result) {
        res.end(JSON.stringify(result));
    });
}).listen(8080);
