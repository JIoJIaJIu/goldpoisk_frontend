modules.define('router', ['location', 'uri', 'controller', 'logger'],
               function(provide, location, Uri, controller, logger) {

    var router = {
        init: function (content) {
            this.content = content;
            this.page = content.findBlockOutside('page');
            this.menu = this.page.findBlockInside('g-menu');
            this.activeController = null;
            var self = this;
            this._params = {}
            _.forIn(location.getState().params, function (value, key) {
                self._params[key] = value[0];
            });
            controller.init(content);

            location.on('change', this._onChange);
        },

        finalize: function () {
            location.un('change', this._onChange);
            controller.finalize();
        },

        route: function (url) {
            this._params = {};
            location.change({ url: url });
        },

        setParams: function (params) {
            _.assign(this._params, params);
            location.change({params: this._params, forceParams: true});
        },

        delParam: function (key) {
            if (!this._params[key])
                return;

            delete this._params[key];
            location.change({params: this._params, forceParams: true});
        },

        getParam: function (key) {
            return this._params[key]
        },

        getUri: function (url) {
            var uri = new Uri(url);

            _.forIn(this._params, function (value, key) {
                uri.addParam(key, value)
            });

            return uri
        },

        getPath: function () {
            return location.getUri().getPath()
        },

        _onChange: function (e, data) {
            var prevUri = new Uri(data.referer);
            var uri = location.getUri();

            if (prevUri.getPath() === uri.getPath())
                return;
            var path = uri.getPath();
            controller.get(path)();
        },

        _params: {}
    }

    provide(router);
});
