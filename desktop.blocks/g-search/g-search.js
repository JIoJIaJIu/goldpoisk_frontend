modules.define('g-search', ['i-bem__dom', 'config', 'router', 'logger'],
    function(provide, BEMDOM, CONFIG, router, logger) {

    var DELAY = 1000;

    BEMDOM.decl('g-search', {
        onSetMod: {
            js: function () {
                this._pending = false;
                this._logger = logger.Logger('g-search');

                var self = this;
                var title = this.findElem('title');
                this.bindTo('button', 'click', function (e) {
                    if (this.hasMod('wide')) {
                        this.delMod('wide');
                        this.setMod('loading', 'left');
                        setTimeout(function () {
                            title.text('Поиск');
                        }, DELAY);
                    } else {
                        this.setMod('loading', 'right');
                        setTimeout(function () {
                            self.setMod('wide');
                            title.text('Меню');
                        }, DELAY);
                    }
                    setTimeout(function () {
                        self.delMod('loading');
                    }, DELAY);
                });

                var searchInput = this.findBlockInside('g-input');

                searchInput.bindTo('keypress', function (e) {
                    if (e.keyCode == 13) {
                        self._logger.debug('enter', searchInput.val());
                        self.search(searchInput.val());
                    }
                });

                searchInput.bindTo('icon', 'click', function (e) {
                    self._logger.debug('click', searchInput.val());
                    self.search(searchInput.val());
                });
            },

            '': function () {
                this.unbindFrom('button', 'click');
                this._logger.finalize();
                this._logger = null;

                //TODO: selectors are bad
                this.domElem.find('.g-input__icon').unbind('click');
            }
        },

        search: function (article) {
            if (!article)
                return;

            if (this._pending)
                return;

            var self = this;
            this._pending = true;

            $.getJSON(CONFIG.REST.searchUrl, {
                article: article
            }, function success (data) {
                router.route(data.url);
                self._pending = false;
            }).fail(function (e) {
                self._logger.error(e.responseText);
                self._pending = false;
            })
        },

        _pending: null
    }, {});

    provide(BEMDOM);
})
