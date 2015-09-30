modules.define('router', ['location', 'uri', 'inherit', 'events', 'controller', 'logger'],
               function(provide, location, Uri, inherit, events, controller, logger) {

    var router = inherit(events.Emitter, {

        __constructor: function () {console.log('init')},

        init: function (content) {
            if (this._isInited)
                return;
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

            this._onChange = _.callback(this._onChange, this);
            location.on('change', this._onChange);
            this._isInited = true;
        },

        finalize: function () {
            location.un('change', this._onChange);
            controller.finalize();
            this._isInited = false;
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
            this.emit('change', path);
        },

        _params: {},
        _isInited: false
    })

    provide(new router());
});
