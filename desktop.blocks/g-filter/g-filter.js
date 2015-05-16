modules.define('g-filter', ['i-bem__dom', 'jquery', 'logger', 'router', 'cookie'],
               function(provide, BEMDOM, $, logger, router, cookie) {
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
                        goods: page.findBlockInside('g-goods'),
                        scrollButton: self.findBlockInside('g-filter__scroll'),
                        header: page.findBlockInside('g-header'),
                        footer: page.findBlockInside('g-footer')
                    };

                    cookie.get('filter_hidden') === 'true' ? this.setMod('hidden') : this.delMod('hidden');

                    this.bindTo(this.elem('button'), 'click', function (e) {
                        this.toggleMod('hidden');
                    });

                    this.bindToWin('scroll', window._scrollFn);

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
                        console.log('3');
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

        _scrollFn: function () {
            var top = 0;
            this._scrollFn = function (e) {
                var currentTop = $(window).scrollTop();
                var TOPSPACE = 30 + this._blocks.header.domElem.height();
                var scrollButton = this._blocks.scrollButton;
                var offset = this.domElem.offset();
                var height = this.domElem.outerHeight();
                var window_height = $(window).outerHeight();
                if (top - currentTop > 0) {
                    // scrollTop
                    if (currentTop + TOPSPACE < offset.top) {
                        var val = offset.top - 30 - (offset.top - currentTop + TOPSPACE);
                        this._top = val > 0 ? val : 0;
                        this.domElem.css('top', this._top + 'px');
                    }
                } else {
                    // scrollBottom
                }
                if ((currentTop - (offset.top + height) > 2 * window_height)
                    || (offset.top - currentTop > 2 * window_height)) {
                    if (scrollButton.hasMod('hidden'))
                        scrollButton.delMod('hidden');
                } else {
                    if (!scrollButton.hasMod('hidden'))
                        scrollButton.setMod('hidden');
                }
                top = currentTop;
            }
        }(),

        _pending: false,
        _data: null,
        _blocks: null,
        _logger: null
    }, {});
    provide(BEMDOM);
})
