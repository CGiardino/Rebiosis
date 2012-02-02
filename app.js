// app.js
var https = require('https');
var fs = require('fs');
var connect = require('connect');
var auth = require('connect-auth');
var MyFirstFormStrategy = require('./myFirstFormStrategy');
var RandomString = require('./randomString');
var options = {
  key: fs.readFileSync('privatekey.pem'),
  cert: fs.readFileSync('certificate.pem')
};
function routes(app) {
    app.get('/',
    function(req, res, params) {
        req.authenticate([''],
        function(error, authenticated) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Hello World');
        });
    });
}
var server = connect.createServer(options,
connect.cookieParser(),
connect.session({
    secret: RandomString.generate()
}),
connect.bodyParser(),
auth(MyFirstFormStrategy()),
connect.router(routes)
);
server.listen(3000);
