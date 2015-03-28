var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var vm = require('vm');
var logger = require('morgan');

app.use(logger());
app.use( express.static('../desktop.bundles/merge') );
app.use( express.static('../') );
app.use( express.static(path.join(__dirname, 'static/')) );

app.get('/', function (req, res) {
    renderIndex(function (html) {
        res.send(html);
    })
})

app.get('/root', function (req, res) {
    var data = fs.readFileSync('data/index/content.json');
    res.json( JSON.parse(data) );
})

app.get('/items', function (req, res) {
    renderItems(function (html) {
        res.send(html);
    })
})

app.get('/rings', function (req, res) {
    var data = fs.readFileSync('data/category/rings.json');
    res.json( JSON.parse(data) );
})


app.get('/success', function (req, res) {
    var productJSON = getProduct();
    fs.readFile('../desktop.bundles/merge/index.priv.js', function (err, data) {
        if (err) throw err;
        var privContext = vm.createContext();
        vm.runInContext(data.toString(), privContext);
        bemjson = [];
        for (var i = 0, length = productJSON.length; i < length; i++) {
            bemjson[i] = ( privContext.blocks['g-product'](productJSON[i]) );
        }
        res.json(bemjson);
    })
});

app.get('/sortparam', function (req, res) {
    var product = getProduct();
    res.json(product);
});

app.get('/product/item', function (req, res) {
    var item = {
        'title': 'Some title',
        'images': [
            'some/path.png'
        ],
        'number': 1,
        'weight': '50 гр.',
        'gems': [
            {
                name: 'Бриллиант',
                carat: '45'
            }
        ],
        'description': 'Описание товара',
        'items': [
            {
                'price': 3500,
                'buyUrl': '#',
                'storeName': 'Saksoniya',
                'storeUrl': '#'
            }
        ],
    };
    fs.readFile('../desktop.bundles/merge/index.priv.js', function (err, data) {
        if (err) throw err;
        var privContext = vm.createContext();
        vm.runInContext(data.toString(), privContext);
        var bemjson = privContext.blocks['g-item'](item);
        setTimeout(function () {
            res.json(bemjson);
        }, 5000);
    })
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});


function renderIndex (cb) {
    fs.readFile('../desktop.bundles/merge/index.priv.js', function (err, data) {
        if (err) throw err;
        var privContext = vm.createContext();
        vm.runInContext(data.toString(), privContext);
        products = JSON.parse(fs.readFileSync('data/products.json'));
        menu = JSON.parse(fs.readFileSync('data/menu.json'));
        var data = {
            'menu': menu,
            'promo': ['/media/promotion/promotion01.png', '/media/promotion/promotion02.png'],
            'products': products,
            'count': 212
        }
        var bemjson = privContext.pages['index'](data);
        fs.readFile('../desktop.bundles/merge/index.bemhtml.js', function (err, data) {
            if (err) throw err;
            var bemhtmlContext = vm.createContext();
            vm.runInContext(data.toString(), bemhtmlContext);
            var html = bemhtmlContext.BEMHTML.apply(bemjson);
            cb(html);
        })
    });
}

function renderItems (cb) {
    fs.readFile('../desktop.bundles/merge/index.priv.js', function (err, data) {
        if (err) throw err;
        var privContext = vm.createContext();
        vm.runInContext(data.toString(), privContext);
        products = fs.readFileSync('data/products.json');
        console.log(products);
        var data = {
            'menu': [{href: '#', label: 'Кольца', type: 'rings'}, {href: '#', label: 'Серьги', type: 'earrings'}],
            //
            'category': 'Кольца',
            'count': 15535,
            'products': JSON.parse(products),
            'sortParams': [{
                'name': 'По алфавиту',
                'url': '#?sort=name',
            }, {
                'name': 'Сначала дорогие',
                'url': '#?sort=tprice',
            }, {
                'name': 'Сначала дешёвые',
                'url': '#?sort=price',
            }],
            'paginator': {
                'totalPages': 10,
                'currentPage': 5,
                'url': '#',
                'config': {
                    'HTTP': {
                        'list': 'http://localhost:3000/success'
                    }
                }
            }
            //
        };
        var bemjson = privContext.pages['category'](data);
        fs.readFile('../desktop.bundles/merge/index.bemhtml.js', function (err, data) {
            if (err) throw err;
            var bemhtmlContext = vm.createContext();
            vm.runInContext(data.toString(), bemhtmlContext);
            var html = bemhtmlContext.BEMHTML.apply(bemjson);
            cb(html);
        })
    });
}

function getProduct() {
    return JSON.parse(fs.readFileSync('data/products.json'));//[0]
}