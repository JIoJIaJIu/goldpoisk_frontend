modules.define('g-filter', ['i-bem__dom', 'jquery', 'logger', 'router'], function(provide, BEMDOM, $, logger, router) {
    BEMDOM.decl('g-filter', {
        onSetMod: {
            js: {
                'inited': function () {
                    var self = this;
                    this._logger = logger.Logger('g-filter').init();
                    this._data = {};
                    var page = this.findBlockOutside('page');
                    this._blocks = {
                        paginator: page.findBlockInside('g-paginator'),
                        goods: page.findBlockInside('g-goods')
                    };
                    var scroll = this.findBlockInside('g-filter__scroll');
                    var goodsContainer = this._blocks.goods.findElem('container');

                    this.bindTo(this.elem('button'), 'click', function (e) {
                        this.toggleMod('hidden');
                        this._blocks.goods.toggleMod('wide');
                        scroll.toggleMod('narrow');
                    });

                    var winHeight = $(window).outerHeight();
                    var filterHeight = this.domElem.outerHeight();
                    var filterBottom = this.domElem.offset().top + filterHeight;
                    $(window).bind('scroll', function (e) {
                        if (($(window).scrollTop() - (self.domElem.offset().top + self.domElem.outerHeight()) > 2 * $(window).outerHeight())
                            || (self.domElem.offset().top - $(window).scrollTop() > 2 * $(window).outerHeight())) {
                            if (scroll.hasMod('hidden'))
                                scroll.delMod('hidden');
                        } else {
                            if (!scroll.hasMod('hidden'))
                                scroll.setMod('hidden');
                        }
                    });

                    scroll.bindTo('click', function (e) {
                        console.log('click');
                        self.domElem.animate({'top': $(window).scrollTop() - self.domElem.outerHeight()}, 1000);
                        this.setMod('hidden');
                    });

                    var button = this.findBlockInside('g-button');
                    button.bindTo('click', function (e) {
                        self._filter();
                    });

                    _.forEach(this.findBlocksInside('g-filter-param'), function (item) {
                        item.on('changed', function (e, data) {
                            self._data[data.type] = data.ids.join('.');
                        });
                    });
                }
            },
            '': function () {
                this.unbindFrom(this.elem('button'), 'click');
                this.findBlockInside('g-button').unbindFrom('click');

                this._logger.finalize();
                this._logger = null;
                this._data = null;
                this._blocks = null;
            }
        },

        _filter: function () {
            if (this._pending)
                return;

            this._logger.debug('Filtering', JSON.stringify(this._data));

            var self = this;
            this._pending = true;
            this._blocks.goods.loading(true);

            this._blocks.paginator.setCurrentPage(1);
            router.setParams(this._data);
            var uri = router.getUri(router.getPath() + '/json');
            var url = uri.toString();

            this._logger.debug('Requesting', url);
            $.getJSON(url, function (data) {
                self._pending = false;
                self._blocks.goods.update(data);
                self._blocks.goods.loading(false);
            });
        },

        _pending: false,
        _data: null,
        _blocks: null,
        _logger: null
    }, {});
    provide(BEMDOM);
})
