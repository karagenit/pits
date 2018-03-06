var http = require('http');
var rest = require('./restapi');
var url  = require('url');
var fs   = require('fs');
var handlebars = require('handlebars');

http.createServer(function (req, res) {
    var token = fs.readFileSync('tba.token', 'utf8').trim();

    var path = url.parse(req.url).pathname;

    var api_path = "";
    var template_name = "";

    if (path === '/events') {
        api_path = '/api/v3/team/frc868/events/2018/simple';
        template_name = 'events.html';
    } else if (path.startsWith('/events/')) {
        var eventCode = path.split('/')[2];
        api_path = '/api/v3/team/frc868/event/2018' + eventCode + '/matches/simple';
        template_name = 'matches.html';
    }

    if (api_path) {
        var options = {
            host: 'www.thebluealliance.com',
            port: 443,
            path: api_path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'frc868',
                'X-TBA-Auth-Key': token
            }
        };

        rest.getJSON(options, function(statusCode, result) {
            var template = handlebars.compile(fs.readFileSync(template_name, 'utf8'));
            res.end(template({'data': result}));
        });
    } else {
        res.end("Page Not Found!");
    }
}).listen(8080);
