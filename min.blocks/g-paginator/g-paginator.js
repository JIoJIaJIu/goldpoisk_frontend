modules.define('g-paginator', ['i-bem__dom', 'jquery', 'location'], function(provide, BEMDOM, $, location) {
    BEMDOM.decl('g-paginator', {
        onSetMod: {
            'js': function () {
                var that = this;
                var goods = this.findBlockOutside('g-content').findBlockInside('g-goods');
                var body = document.body;
                var spin_down = $("#down");
                var spin_up = $("#up");
                var pending = false;
                $(window).scroll(function(e) {
                    if (body.scrollHeight - body.scrollTop - $(window).height() <= 0) {
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
                        $.getJSON('http://localhost:3000/success', function success(data) {
                            setTimeout(function () {
                                goods.append(data);
                                pending = false;
                                $('#down').css("display", "none");
                            }, 3000);
                            location.change({ params: { page: that.params.currentPage + 1 } });
                            window.location.href;
                        });
                    } else if (body.scrollTop <= 0) {
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
                        $.getJSON('http://localhost:3000/success', function success (data) {
                            setTimeout(function () {
                                goods.prepend(data);
                                pending = false;
                                $('#up').css("display", "none");
                            }, 3000);
                            location.change({ params: { page: that.params.currnetPage - 1 }});
                        });
                    }
                });
            }
        }
    }, {});
    provide(BEMDOM);
})
