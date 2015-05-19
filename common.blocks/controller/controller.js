modules.define('controller', ['i-bem__dom', 'uri', 'config', 'logger', 'page'],
    function (provide, BEMDOM, Uri, CONFIG, logger) {
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

            var controller;
            for (var reg in this._config) {
                if ((new RegExp(reg)).test(key)) {
                    controller = this._config[reg]
                    break;
                }
            }

            if (!controller) {
                logger.error('There is no such controller for', key);
                return function () {};
            }

            return _.partial(controller, key);
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

        return function controller (url) {
            self._logger.debug('Controller:', type, url);
            self._active = controller;
            self._blocks.menu.selectByUrl(url);
            self._blocks.content.setMod('loading', true);
            // disable header on main page
            if (~['index', 'item'].indexOf(type)) {
                header.disable();
                $(window).scrollTop(0);
            } else {
                header.enable();
            }

            $.getJSON(url, function success(data) {
                if (self._active != controller)
                    return;

                var title = data.title;
                var description = data.description;
                var capitalize = true;
                if (type == 'item') {
                    title = self._blocks.page.genTitle(data.title);
                    description = self._blocks.page.genDescription(data.title, data.category);
                    capitalize = false;
                }

                self._blocks.page.setTitle(title);
                self._blocks.page.setDescription(description, capitalize);

                var bemjson = pages[config.priv](data);
                self._blocks.content.update(bemjson);
                self._blocks.content.delMod('loading');
            });
        }
    }

    provide(controller);
});
