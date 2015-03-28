modules.define('router', ['i-bem', 'location', 'i-bem__dom', 'uri'], function(provide, BEM, location, BEMDOM, Uri) {
    var config = {
        '/': function () {
            console.log('Controller: root');
            $.getJSON('/root', function success(data) {
                var bemjson = pages['index.content'](data);
                var page = router.content.findBlockOutside('page');
                BEMDOM.replace(
                    router.content.domElem,
                    BEMHTML.apply(bemjson)
                )
            });
        },
        '/rings': function () {
            console.log('Controller: rings');
            $.getJSON('/rings', function success(data) {
                var bemjson = pages['category.content'](data);
                var page = router.content.findBlockOutside('page');
                BEMDOM.replace(
                    router.content.domElem,
                    BEMHTML.apply(bemjson)
                )
            })
        }
    }

    var router = {
        init: function (content) {
            this.content = content;
        },
        route: function (url) {
            location.change({ url: url });

        },
        _getController: function (key) {
            if (!key) {
                console.error('Should point key');
                return function () {};
            }
            var controller = config[key];
            if (!controller) {
                console.error('There is no such controller for', key);
                return function () {};
            }
            return controller;
        }
    }
    location.on('change', function (e, data) {
        var prevUri = new Uri(data.referer);
        var uri = location.getUri();

        if (prevUri.getPath() === uri.getPath())
            return;
        var path = uri.getPath();
        router._getController(path)();
    })
    provide(router);
});