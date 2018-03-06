var http = require('http');
var rest = require('./restapi');
var url  = require('url');
var fs   = require('fs');
var handlebars = require('handlebars');

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
            var template = handlebars.compile(fs.readFileSync('events.html', 'utf8'));
            res.end(template({'events': result}));
        });
    } else if (path.startsWith('/events/')) {
        var eventCode = path.split('/')[2];
        var options = {
            host: 'www.thebluealliance.com',
            port: 443,
            path: '/api/v3/team/frc868/event/2018' + eventCode + '/matches/simple',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'frc868',
                'X-TBA-Auth-Key': token
            }
        };

        rest.getJSON(options, function(statusCode, result) {
            res.end(JSON.stringify(result));
            //res.write('<html><head></head><body>');
            //result.forEach(function(e) {
            //    res.write('<p>' + JSON.stringify(e) + '</p>');
            //});
            //res.end('</body></html>');
        });

    } else {
        // TODO: 404?
        res.end("Page Not Found!");
    }

    // TODO: index page?
}).listen(8080);
