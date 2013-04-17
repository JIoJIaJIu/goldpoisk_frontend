module.exports = {
    'init': function (server, express) {
        server.use(express.logger());
        server.use(express.static(__dirname + '/views/markup'));

        server.engine('html', require('ejs').renderFile);
    }
}
