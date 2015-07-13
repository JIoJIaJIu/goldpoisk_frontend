var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var vm = require('vm');

app.use( express.static('../desktop.bundles/merge') );
app.use( express.static('../') );
app.use( express.static(path.join(__dirname, 'static/')) );
app.use(function (req, res, next) {
    setTimeout(next, 3000)
})

var urls = [
    '/necklaces',
    '/chains',
    '/pendants',
    '/bracelets',
    '/rings',
    '/earrings',
    '/brooches',
    '/watches',
    '/cutlery'
]

urls.forEach(function (url) {
    app.get(url, function (req, res) {
        var data = fs.readFileSync(path.join('data/category', url + '.json'));
        if (!req.xhr) {
            var priv = initPriv();
            var json = JSON.parse(data);
            json.menu = getMenu();
            var bemjson = priv.pages["category"](json, {production: false});
            var bemhtml = initBemhtml();
            var html = bemhtml.BEMHTML.apply(bemjson);

            res.send(html);
        } else {
            res.json(JSON.parse(data));
        }
    });
})

app.get('/', function (req, res) {
    if (!req.xhr) {
        renderIndex(function (html) {
            res.send(html);
        });
    } else {
        var data = fs.readFileSync('data/index/content.json');
        res.json( JSON.parse(data) );
    }
});

app.get('/item/(:id([0-9]*))?', function (req, res) {
    if (!req.xhr) {
        fs.readFile('../desktop.bundles/merge/index.priv.js', function (err, data) {
            if (err) throw err;
            var privContext = vm.createContext();
            vm.runInContext(data.toString(), privContext);
            var menu = getMenu();
            var item = getItem();
            var data = {
                'menu': menu,
                'title': 'Title товара',
                'description': 'Description товара',
                'category': 'Кольца',
                'categoryUrl': '/rings',
                'item': item
            };
            var bemjson = privContext.pages['item'](data, {production: false});
            fs.readFile('../desktop.bundles/merge/index.bemhtml.js', function (err, data) {
                if (err) throw err;
                var bemhtmlContext = vm.createContext();
                vm.runInContext(data.toString(), bemhtmlContext);
                var html = bemhtmlContext.BEMHTML.apply(bemjson);
                res.send(html);
            });
        });
    } else {
        var data = fs.readFileSync('data/item/item.json');
        res.json( JSON.parse(data) );
    }
});

app.get('/searchs', function (req, res) {
    var product = fs.readFileSync('data/item/item.json');
    res.json(JSON.parse(product));
});

app.get('/success', function (req, res) {
    var productJSON = getProduct();
    fs.readFile('../desktop.bundles/merge/index.priv.js', function (err, data) {
        if (err) throw err;
        var privContext = vm.createContext();
        vm.runInContext(data.toString(), privContext);
        bemjson = [];
        for (var i = 0, length = productJSON.length; i < length; i++) {
            bemjson[i] = productJSON[i];
        }
        var response = {}
        response.list = bemjson;
        res.json(response);
    })
});

app.get('/[a-z]*/json', function (req, res) {
    var product = getProduct();
    var o = {
        count: product.length,
        list: product
    };
    res.json(o);
});

app.get('/product/item', function (req, res) {
    var item = {
        'id': 1,
        'title': 'Some Title',
        'js': true,
        'url': '/item/1',
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
        'items': [/*
            {
                'price': 3500,
                'buyUrl': '#',
                'storeName': 'Saksoniya',
                'storeUrl': '#'
            }, {
                'price': 4000,
                'buyUrl': '#',
                'storeName': 'Sega',
                'storeUrl': '#'
            }*/
        ],
    };
    res.json(item);
    /*fs.readFile('../desktop.bundles/merge/index.priv.js', function (err, data) {
        if (err) throw err;
        var privContext = vm.createContext();
        vm.runInContext(data.toString(), privContext);
        var bemjson = privContext.blocks['g-item'](item);
        setTimeout(function () {
            res.json(bemjson);
        }, 1000);
    })*/
});

app.get('/not-found', function (req, res) {
    var bids = fs.readFileSync('data/404/notfound.json');
    res.json(JSON.parse(bids));
})

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
            'promo': [{
                'src': '../desktop.blocks/g-promotion/images/promotion_02.jpg',
                'title': 'Title',
                'items': [{
                    'title': 'Здесь пиздец какой длинный текст, ну нереально длинный текст иммитирующий название товара',
                    'price': 5000,
                    'url': '#',
                    'x': 100,
                    'y': 100
                }]
            }, {
                'src': '../desktop.blocks/g-promotion/images/promotion_01.jpg',
                'title': 'Title 2',
                'items': [{
                    'title': 'Item 2 title',
                    'price': 7000,
                    'url': '#',
                    'x': 200,
                    'y': 200
                }]
            }],
            'products': products,
            'count': 212
        }
        var bemjson = privContext.pages['index'](data, {production: false});
        fs.readFile('../desktop.bundles/merge/index.bemhtml.js', function (err, data) {
            if (err) throw err;
            var bemhtmlContext = vm.createContext();
            vm.runInContext(data.toString(), bemhtmlContext);
            var html = bemhtmlContext.BEMHTML.apply(bemjson);
            cb(html);
        })
    });
}

function initPriv() {
    var priv = fs.readFileSync('../desktop.bundles/merge/index.priv.js').toString();
    var context = vm.createContext();
    vm.runInContext(priv, context);
    return context;
}

function initBemhtml() {
    var bemhtml = fs.readFileSync('../desktop.bundles/merge/index.bemhtml.js').toString();
    var context = vm.createContext();
    vm.runInContext(bemhtml, context);
    return context;
}

function getMenu() {
    return JSON.parse(fs.readFileSync('data/menu.json'));
}

function getProduct() {
    return JSON.parse(fs.readFileSync('data/products.json'));//[0]
}

function getItem() {
    return {
        "title": "Title товара",
        "category": "Кольца",
        "id": 1,
        "url": "#",
        "number": "123123",
        "weight": "5 гр.",
        "items": [{
            "storeName": "Название магазина",
            "storeUrl": "#",
            "buyUrl": "#",
            "price": 5000
        }],
        "images": [
            "img1",
            "img2"
        ]
    }
}
