var http = require('http');
var rest = require('./restapi');
var url  = require('url');
var fs   = require('fs');

http.createServer(function (req, res) {
    var token = fs.readFileSync('tba.token', 'utf8').trim();

    //handle url breakdown and set options

    var path = url.parse(req.url).pathname;

    if (path === '/events') {
        var options = {
            host: 'www.thebluealliance.com',
            port: 443,
            path: '/api/v3/team/frc868/events/2018/simple',
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
    }
}).listen(8080);
