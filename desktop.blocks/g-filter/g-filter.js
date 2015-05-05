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
                        flowButton: self.findBlockInside('g-filter__scroll')
                    };
                    var state = cookie.get('filter_hidden');
                    if (state === 'true') {
                        this.setMod('hidden');
                    }
                    var goodsContainer = this._blocks.goods.findElem('container');
                    var footer = page.findBlockInside('g-footer');

                    this.bindTo(this.elem('button'), 'click', function (e) {
                        this.toggleMod('hidden');
                    });

                    var winHeight = $(window).outerHeight();
                    var filterHeight = this.domElem.outerHeight();
                    var filterBottom = this.domElem.offset().top + filterHeight;
                    var startPosition = this.domElem.offset().top;
                    this.bindToWin('scroll', this._watchFlowFn);

                    this._blocks.flowButton.bindTo('click', function (e) {
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
                        }
                        self.delMod('hidden');
                        this.setMod('hidden');
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
                },
                '': function () {
                    this.unbindFrom(this.elem('button'), 'click');
                    this.findBlockInside('g-button').unbindFrom('click');
                    this.unbindFromWin('scroll', this._watchFlowFn);

                    this._logger.finalize();
                    this._logger = null;
                    this._data = null;
                    this._blocks = null;
                }
            },
            'hidden': {
                true: function () {
                    this._blocks.goods.setMod('wide');
                    this._blocks.flowButton.setMod('narrow');
                    cookie.set('filter_hidden', true, {
                        expires: 1
                    });
                },
                '': function () {
                    this._blocks.goods.delMod('wide');
                    this._blocks.flowButton.delMod('narrow');
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

        _watchFlowFn: function (event) {
            if (($(window).scrollTop() - (this.domElem.offset().top + this.domElem.outerHeight()) > 2 * $(window).outerHeight())
                || (this.domElem.offset().top - $(window).scrollTop() > 2 * $(window).outerHeight())) {
                if (this._blocks.flowButton.hasMod('hidden'))
                    this._blocks.flowButton.delMod('hidden');
            } else {
                if (!this._blocks.flowButton.hasMod('hidden'))
                    this._blocks.flowButton.setMod('hidden');
            }
        },

        _pending: false,
        _data: null,
        _blocks: null,
        _logger: null
    }, {});
    provide(BEMDOM);
})
