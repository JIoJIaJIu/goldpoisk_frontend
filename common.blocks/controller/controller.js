modules.define('controller', ['i-bem__dom', 'uri', 'config', 'logger'], function (provide, BEMDOM, Uri, CONFIG, logger) {
    var controller = {
        init: function (content) {
            if (this._isInited) {
                logger.debug('Controller was inited');
                return
            }

            this._logger = logger.Logger('Controller').init();
            this._blocks.content = content;
            this._blocks.page = content.findBlockOutside('page');
            this._blocks.menu = this._blocks.page.findBlockInside('g-menu');
            this._active = null;

            for (key in CONFIG.page) {
                this._config[CONFIG.page[key].url] = createController.call(this, key);
            }

            this._isInited = true;
        },

        finalize: function () {
            this._isInited = false;
            this._config = null;
            this._blocks = {};

            this._logger.finalize();
            this._logger = null;
        },

        get: function (key) {
            if (!key) {
                logger.error('Should point key');
                return function () {};
            }

            if (key.search(/id[0-9]+/) != -1 ) {
                console.log(key);
                key = '/id';
            }

            var controller = this._config[key];
            if (!controller) {
                logger.error('There is no such controller for', key);
                return function () {};
            }
            return controller;
        },

        _active: null,
        _config: {},
        _isInited: false,
        _blocks: {},
        _logger: null
    }

    function createController(type) {
        var self = this;
        this._logger.debug('Create controller', type);
        var config = CONFIG.page[type];
        if (!config)
            throw new Error('There is no such page configuration for ' + type);

        var header = self._blocks.page.findBlockInside('g-header');

        return function controller () {
            self._logger.debug('Controller:', type);
            self._active = controller;
            self._blocks.menu.selectByUrl(config.url);
            self._blocks.content.setMod('loading', true);
            // disable header on main page
            if (type == 'index') {
                header.disable();
                $(window).scrollTop(0);
            } else {
                header.enable();
            }

            $.getJSON(config.url, function success(data) {
                if (self._active != controller)
                    return;

                var bemjson = pages[config.priv](data);
                self._blocks.content.update(bemjson);
                self._blocks.content.delMod('loading');
            });
        }
    }

    provide(controller);
});
