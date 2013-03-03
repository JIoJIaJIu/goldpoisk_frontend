var express = require('express');

var server = express();
const params = {
    HTTP_SERVER_PORT: process.argv[2] || 8080
};

require('./config').init(server, express);

server.get('/', function (req, res) {
    res.render('markup/index.html')
});

server.listen(params.HTTP_SERVER_PORT)
