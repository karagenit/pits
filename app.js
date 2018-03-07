var http = require('http');
var rest = require('./restapi');
var url  = require('url');
var fs   = require('fs');
var handlebars = require('handlebars');

handlebars.registerHelper("printTime", function(timestamp) {
    var date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit' });
});

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
    } else if (path === "/") {
        template_name = "index.html";
    } else {
        template_name = "404.html";
    }

    var template = handlebars.compile(fs.readFileSync('templates/' + template_name, 'utf8'));

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
            result.sort(function(a, b) {
                return a.match_number - b.match_number
            });
            res.end(template({'data': result}));
        });
    } else {
        res.end(template({}));
    }
}).listen(8080);
