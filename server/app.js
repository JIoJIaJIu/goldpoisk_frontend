var express = require('express');
var app = express();

var product = {
    block: 'g-product',
    url: '#',
    title: 'Новое кольцо',
    imageUrl: '../../desktop.blocks/g-goods/images/good.png',
    weight: '5.9 грамм',
    carat: '0,14 карат',
    price: 5000,
    store: 'GoldPoisk',
    storeUrl: '#'
}

app.get('/success', function (req, res) {
    res.json(product);
});

app.get('/sortparam', function (req, res) {
    res.json(product);
});

app.use( express.static('../') );

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
