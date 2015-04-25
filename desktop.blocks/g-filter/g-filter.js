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
                    var scrollButton = this.findBlockInside('g-filter__scroll');
                    var goodsContainer = this._blocks.goods.findElem('container');
                    var footer = this.findBlockOutside('page').findBlockInside('g-footer');

                    this.bindTo(this.elem('button'), 'click', function (e) {
                        this.toggleMod('hidden');
                        this._blocks.goods.toggleMod('wide');
                        scrollButton.toggleMod('narrow');
                    });

                    var winHeight = $(window).outerHeight();
                    var filterHeight = this.domElem.outerHeight();
                    var filterBottom = this.domElem.offset().top + filterHeight;
                    var startPosition = this.domElem.offset().top;
                    $(window).bind('scroll', function (e) {
                        if (($(window).scrollTop() - (self.domElem.offset().top + self.domElem.outerHeight()) > 2 * $(window).outerHeight())
                            || (self.domElem.offset().top - $(window).scrollTop() > 2 * $(window).outerHeight())) {
                            if (scrollButton.hasMod('hidden'))
                                scrollButton.delMod('hidden');
                        } else {
                            if (!scrollButton.hasMod('hidden'))
                                scrollButton.setMod('hidden');
                        }
                    });

                    scrollButton.bindTo('click', function (e) {
                        var wasHidden = self.hasMod('hidden');
                        self.setMod('hidden', 'force');

                        var goTo = $(window).scrollTop() - 150;
                        if (goTo < startPosition)
                            goTo = 0;
                        if (goTo + self.domElem.outerHeight() > footer.domElem.offset().top) {
                            goTo = footer.domElem.offset().top - startPosition - self.domElem.outerHeight();
                        }

                        self.domElem.css('top', goTo + 'px');

                        if (wasHidden) {
                            self.setMod('hidden', true);
                            self._blocks.goods.setMod('wide');
                        }
                        self.delMod('hidden');
                        self._blocks.goods.delMod('wide');
                        this.setMod('hidden');
                        this.delMod('narrow');
                    });

                    var button = this.findBlockInside('g-button');
                    button.bindTo('click', function (e) {
                        $("body,html").animate({scrollTop: 0}, 750, 'easeInQuart');
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
