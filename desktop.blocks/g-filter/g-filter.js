modules.define('g-filter', ['i-bem__dom', 'jquery', 'logger', 'router', 'cookie', 'i-scroll'],
               function(provide, BEMDOM, $, logger, router, cookie, scroll) {
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

                    var TOPSPACE = 30;

                    cookie.get('filter_hidden') === 'true' ? this.setMod('hidden') : this.delMod('hidden');

                    this.bindTo(this.elem('button'), 'click', function (e) {
                        this.toggleMod('hidden');
                    });
                    scroll.on('scrollTop', function (e) {
                        console.log('Scroll to top');
                        var currentTop = $(window).scrollTop();
                        var offset = self.domElem.offset();

                        if (currentTop + (self._blocks.header.domElem.height() + TOPSPACE) <= offset.top) {
                            var val = offset.top - TOPSPACE - (offset.top - currentTop + (self._blocks.header.domElem.height() + TOPSPACE));
                            val = val > 0 ? val : 0;
                            self.domElem.css('top', val + 'px');
                        }
                    });

                    scroll.on('scrollBottom', function (e) {
                        console.log('Scroll to bottom');
                        var currentTop = $(window).scrollTop();
                        var scrollButton = self._blocks.scrollButton;
                        var offset = self.domElem.offset();
                        var height = self.domElem.outerHeight();
                        var window_height = $(window).outerHeight();
                        if ((currentTop - (offset.top + height) > 2 * window_height)
                            || (offset.top - currentTop > 2 * window_height)) {
                            if (scrollButton.hasMod('hidden'))
                                scrollButton.delMod('hidden');
                        } else {
                            if (!scrollButton.hasMod('hidden'))
                                scrollButton.setMod('hidden');
                        }
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
                    scroll.finalize();
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

        _pending: false,
        _data: null,
        _blocks: null,
        _logger: null
    }, {});
    provide(BEMDOM);
})
