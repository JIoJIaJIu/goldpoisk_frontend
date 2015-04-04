modules.define('g-paginator', ['i-bem__dom', 'jquery', 'location', 'config'], function(provide, BEMDOM, $, location, config) {
    BEMDOM.decl('g-paginator', {
        onSetMod: {
            js:  {
                inited: function () {
                    var that = this;
                    var goods = this.findBlockOutside('g-content').findBlockInside('g-goods');
                    var body = document.body;
                    var pending = false;
                    var config = this.params.config;
                    var currentPage = parseInt(this.params.currentPage, 10);
                    var totalPage = parseInt(this.params.totalPages, 10);

                    this.bindToWin('scroll', function(e) {
                        var bodyScrollTop = $(document).scrollTop();
                        if (body.scrollHeight - bodyScrollTop - $(window).height() <= 0) {
                            if (totalPage > currentPage) {
                                $('#down').css("display", "inline-block");
                                if (pending) {
                                    return;
                                }
                                pending = true;
                                var nextPage = currentPage + 1;
                                $.getJSON(config.HTTP.list, {
                                    page: nextPage
                                }, function success(data) {
                                    goods.append(data);
                                    pending = false;
                                    $('#down').css("display", "none");
                                    location.change({ params: { page: nextPage } });
                                    currentPage = nextPage;
                                });
                            }
                        } else if (body.scrollTop <= 0) {
                            //TODO:
                            return;
                            $('#up').css("display", "inline-block");
                            if (pending) {
                                return;
                            }
                            pending = true;
                            var prevPage = currentPage - 1 || 1;
                            $.getJSON(config.HTTP.list, {
                                page: prevPage
                            }, function success (data) {
                                    goods.prepend(data);
                                    pending = false;
                                    $('#up').css("display", "none");
                                    location.change({ params: { page: prevPage }});
                                    currentPage = prevPage;
                            });
                        }
                    });
                },

                '': function () {
                    this.unbindFromWin('scroll');

                }
            }
        },

        REST: null
    }, {});
    provide(BEMDOM);
})
