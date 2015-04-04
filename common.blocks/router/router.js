modules.define('router', ['location', 'uri', 'controller', 'logger'],
               function(provide, location, Uri, controller, logger) {

    var router = {
        init: function (content) {
            this.content = content;
            this.page = content.findBlockOutside('page');
            this.menu = this.page.findBlockInside('g-menu');
            this.activeController = null;
            controller.init(content);

            location.on('change', this._onChange);
        },

        finalize: function () {
            location.un('change', this._onChange);
            controller.finalize();
        },

        route: function (url) {
            location.change({ url: url });
        },

        _onChange: function (e, data) {
            var prevUri = new Uri(data.referer);
            var uri = location.getUri();

            if (prevUri.getPath() === uri.getPath())
                return;
            var path = uri.getPath();
            controller.get(path)();
        }
    }

    provide(router);
});
