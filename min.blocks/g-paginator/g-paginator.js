modules.define('g-paginator', ['i-bem__dom', 'jquery', 'router', 'config'], function(provide, BEMDOM, $, router, config) {
    BEMDOM.decl('g-paginator', {
        onSetMod: {
            js:  {
                inited: function () {
                    this.setCurrentPage(this.params.currentPage);
                    this._totalPages = parseInt(this.params.totalPages, 10);
                    this._pending = false;
                    this._topPage = this._currentPage;
                    this._bottomPage = this._currentPage;

                    var self = this;
                    var goods = this.findBlockOutside('g-content').findBlockInside('g-goods');
                    var body = document.body;
                    var button = goods.findBlockInside({block: 'g-button', modName: 'prev', modVal: true});

                    if (this._topPage == 1) {
                        var spinup = goods.findElem('up-spin');
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
                            if (this._topPage == 1)
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
            if (this._totalPages == this._bottomPage)
                return;

            if (this._pending)
                return;

            this._bottomPage++;

            this._pending = true;

            $('#down').css('display', 'inline-block');
            var self = this;
            var config = this.params.config;
            var nextPage = this._bottomPage;
            var uri = router.getUri(config.HTTP.list);
            uri.deleteParam('page');

            $.getJSON(uri.toString(), {
                page: nextPage
            }, function success(data) {
                goods.append(data.list);
                self._pending = false;
                self.setCurrentPage(nextPage);
                $('#down').css('display', 'none');
            });
        },

        _scrollUp: function (goods) {
            if (this._topPage == 1)
                return;

            if (this._pending)
                return;

            this._topPage--;

            this._pending = true;

            if (this._topPage == 1)
                goods.findElem('up-spin').css('display', 'none');

            $('#up').css('display', 'inline-block');
            var that = this;
            var config = this.params.config;
            var prevPage = this._topPage;
            var uri = router.getUri(config.HTTP.list);
            uri.deleteParam('page');

            $.getJSON(uri.toString(), {
                page: prevPage
            }, function success(data) {
                goods.prepend(data.list);
                that._pending = false;
                that.setCurrentPage(prevPage);
                $('#up').css('display', 'none');
            });
        },

        _totalPages: 0,
        _currentPage: 1,
        _pending: false,
        _topPage: null,
        _bottomPage: null
    }, {});
    provide(BEMDOM);
})
