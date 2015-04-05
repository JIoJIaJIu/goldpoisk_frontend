modules.define('g-paginator', ['i-bem__dom', 'jquery', 'router', 'config'], function(provide, BEMDOM, $, router, config) {
    BEMDOM.decl('g-paginator', {
        onSetMod: {
            js:  {
                inited: function () {
                    this.setCurrentPage(this.params.currentPage);
                    this._totalPages = parseInt(this.params.totalPages, 10);
                    this._pending = false;
                    this._startPage = this._currentPage;

                    var self = this;
                    var goods = this.findBlockOutside('g-content').findBlockInside('g-goods');
                    var body = document.body;
                    var button = goods.findBlockInside('g-button');

                    if (this._currentPage == 1) {
                        var spinup = goods.findElem('up-spin');
                        debugger;
                        spinup.css('display', 'none');
                    }

                    button.bindTo('click', function (e) {
                        button.domElem.css('display', 'none');
                        self._scrollUp(goods);
                    });

                    this.bindToWin('scroll', function(e) {
                        var bodyScrollTop = $(document).scrollTop();
                        if (body.scrollHeight - bodyScrollTop - $(window).height() <= 0) {
                            self._scrollDown(goods);
                        }
                        if (bodyScrollTop == 0) {
                            if (this._currentPage <= 1 || this._startPage == 1)
                                return;
                            button.domElem.css('display', 'block');
                        }
                    });
                },

                '': function () {
                    this.unbindFromWin('scroll');

                }
            },
        },

        setCurrentPage: function (page) {
            this._currentPage = parseInt(page, 10);
            if (this._currentPage === 1) {
                router.delParam('page');
                return;
            }
            router.setParams({page: this._currentPage});
        },

        _scrollDown: function (goods) {
            if (this._totalPages <= this._currentPage)
                return;

            if (this._pending) {
                return;
            }
            this._pending = true;

            $('#down').css('display', 'inline-block');
            var self = this;
            var config = this.params.config;
            var nextPage = this._currentPage + 1;
            var uri = router.getUri(config.HTTP.list);

            $.getJSON(uri.toString(), {
                page: nextPage
            }, function success(data) {
                goods.append(data);
                self._pending = false;
                self.setCurrentPage(nextPage);
                $('#down').css('display', 'none');
            });
        },

        _scrollUp: function (goods) {
            if (this._currentPage <= 1)
                return;
            if (this._pending)
                return;

            $('#up').css('display', 'inline-block');
            var that = this;
            var config = this.params.config;
            var prevPage = this._currentPage - 1;
            var uri = router.getUri(config.HTTP.list);

            $.getJSON(uri.toString(), {
                page: prevPage
            }, function success(data) {
                goods.prepend(data);
                that._pending = false;
                that.setCurrentPage(prevPage);
                $('#up').css('display', 'none');
            });
        },
        _startPage: null,
        _totalPages: 0,
        _currentPage: 1,
        _pending: false
    }, {});
    provide(BEMDOM);
})
