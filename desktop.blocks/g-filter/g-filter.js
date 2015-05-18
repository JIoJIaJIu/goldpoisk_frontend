modules.define('g-filter', ['i-bem__dom', 'jquery', 'logger', 'router', 'cookie', 'i-scroll'],
               function(provide, BEMDOM, $, logger, router, cookie, scroll) {
    BEMDOM.decl('g-filter', {
        onSetMod: {
            js: {
                'inited': function () {
                    var self = this;
                    var page = this.findBlockOutside('page');

                    this._logger = logger.Logger('g-filter').init();
                    this._data = {};
                    this._blocks = {
                        paginator: page.findBlockInside('g-paginator'),
                        goods: page.findBlockInside('g-goods'),
                        scrollButton: self.findBlockInside('g-filter__scroll'),
                        header: page.findBlockInside('g-header'),
                        footer: page.findBlockInside('g-footer')
                    };

                    cookie.get('filter_hidden') === 'true' ? this.setMod('hidden') : this.delMod('hidden');

                    this.bindTo(this.elem('button'), 'click', function (e) {
                        this.toggleMod('hidden');
                    });

                    this._bindScroll();

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

                    var startPosition = this.domElem.offset().top;
                    this._moveFn = function (e) {
                        var isHidden = self.hasMod('hidden');
                        self.setMod('hidden', 'force');

                        var goTo = $(window).scrollTop() - 150;
                        if (goTo < startPosition)
                            goTo = 0;
                        if (goTo + self.domElem.outerHeight() > self._blocks.footer.domElem.offset().top) {
                            goTo = self._blocks.footer.domElem.offset().top - startPosition - self.domElem.outerHeight();
                        }

                        self.domElem.css('top', goTo + 'px');

                        if (isHidden) {
                            self.setMod('hidden', true);
                        }
                        self.delMod('hidden');
                        this.setMod('hidden');
                    };
                    this._blocks.scrollButton.bindTo('click', this._moveFn);
                },
                '': function () {
                    this.unbindFrom(this.elem('button'), 'click');
                    this.findBlockInside('g-button').unbindFrom('click');
                    this.unbindFromWin('scroll', this._scrollFn);
                    this._unbindScroll();

                    this._logger.finalize();
                    this._logger = null;
                    this._data = null;
                    this._blocks = null;
                }
            },
            'hidden': {
                true: function () {
                    this._blocks.goods.setMod('wide');
                    this._blocks.scrollButton.setMod('narrow');
                    cookie.set('filter_hidden', true, {
                        expires: 1
                    });
                },
                '': function () {
                    this._blocks.goods.delMod('wide');
                    this._blocks.scrollButton.delMod('narrow');
                    cookie.set('filter_hidden', false, {
                        expires: 1
                    });
                }
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

        _bindScroll: function () {
            var self = this;
            var TOPSPACE = 30;

            this._scrollTopFn = function (e) {
                var currentTop = $(window).scrollTop();
                var filterOffset = self.domElem.offset();
                var marginTop = self._blocks.header.domElem.height() + TOPSPACE;

                if (currentTop + marginTop <= filterOffset.top) {
                    var val = filterOffset.top - TOPSPACE - (filterOffset.top - currentTop + marginTop);
                    val = val > 0 ? val : 0;
                    self.domElem.css('top', val + 'px');
                }
            };

            this._scrollBottomFn = function (e) {
                var currentTop = $(window).scrollTop();
                var scrollButton = self._blocks.scrollButton;
                var filterOffset = self.domElem.offset();
                var filterHeight = self.domElem.outerHeight();
                var windowHeight = $(window).outerHeight();

                if ((currentTop - (filterOffset.top + filterHeight) > 2 * windowHeight)
                    || (filterOffset.top - currentTop > 2 * windowHeight)) {
                    scrollButton.delMod('hidden');
                } else {
                    scrollButton.setMod('hidden');
                }
            };

            scroll.on('scrollTop', this._scrollTopFn);
            scroll.on('scrollBottom', this._scrollBottomFn);
        },

        _unbindScroll: function () {
            scroll.un('scrollTop', this._scrollTopFn);
            scroll.un('scrollBottom', this._scrollBottomFn);
        },

        _pending: false,
        _data: null,
        _blocks: null,
        _logger: null,

        _moveFn: null,
        _scrollTopFn: null,
        _scrollBottomFn: null

    }, {});
    provide(BEMDOM);
})
