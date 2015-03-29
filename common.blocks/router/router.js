modules.define('router', ['i-bem', 'location', 'i-bem__dom', 'uri', 'config'],
               function(provide, BEM, location, BEMDOM, Uri, CONFIG) {

    var config = {};

    for (key in CONFIG.page) {
        config[CONFIG.page[key].url] = createController(key);
    }

    function createController(type) {
        console.log('Create controller', type);
        var config = CONFIG.page[type];
        if (!config)
            throw new Error('There is no such page configuration for ' + type);

        return function controller () {
            router.activeController = controller;
            console.log('Controller:', type);
            var items = router.menu.findBlocksInside('g-menu-item');
            _.forEach(items, function (item) {
                if (item.params.href == config.url) {
                    item.setMod('state', 'active');
                } else {
                    item.delMod('state');
                }
            });
            router.content.setMod('loading', true);
            $.getJSON(config.url, function success(data) {
                if (router.activeController != controller)
                    return;
                var bemjson = pages[config.priv](data);
                BEMDOM.update(
                    router.content.domElem,
                    BEMHTML.apply(bemjson)
                );
                router.content.delMod('loading');
            });
        }
    }

    var router = {
        init: function (content) {
            this.content = content;
            this.page = content.findBlockOutside('page');
            this.menu = this.page.findBlockInside('g-menu');
            this.activeController = null;
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