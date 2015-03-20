modules.define('g-paginator', ['i-bem__dom', 'jquery', 'location', 'config'], function(provide, BEMDOM, $, location, config) {
    BEMDOM.decl('g-paginator', {
        onSetMod: {
            'js': function () {
                var that = this;
                var goods = this.findBlockOutside('g-content').findBlockInside('g-goods');
                var body = document.body;
                var pending = false;
                var config = this.params.config;
                var currentPage = parseInt(this.params.currentPage, 10);
                $(window).scroll(function(e) {
                    var bodyScrollTop = $(document).scrollTop();
                    if (body.scrollHeight - bodyScrollTop - $(window).height() <= 0) {
                        BEMDOM.append(
                            goods.elem('down-spin'),
                            BEMHTML.apply({
                                block: 'g-spin',
                                mods: { theme : 'islands', size : 'xl', visible : true },
                                attrs: { id: 'down' }
                            })
                        );
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
                    } else if (body.scrollTop <= 0) {
                        //TODO:
                        return;
                        BEMDOM.append(
                            goods.elem('up-spin'),
                            BEMHTML.apply({
                                block: 'g-spin',
                                mods: { theme : 'islands', size : 'xl', visible : true },
                                attrs: { id: 'up' }
                            })
                        );
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
            }
        },

        REST: null
    }, {});
    provide(BEMDOM);
})
