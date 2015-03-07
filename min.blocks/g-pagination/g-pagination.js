modules.define('g-pagination', ['i-bem__dom', 'jquery', 'location'], function(provide, BEMDOM, $, location) {
    BEMDOM.decl('g-pagination', {
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
                        spin_down.css("display", "inline-block");
                        if (pending) {
                            return;
                        }
                        pending = true;
                        $.getJSON('http://localhost:3000/success', function success(data) {
                            setTimeout(function () {
                                goods.append(data);
                                pending = false;
                                spin_down.css("display", "none");
                            }, 3000);
                            location.change({ params: { page: that.params.currentPage + 1 } });
                            window.location.href;
                        });
                    } else if (body.scrollTop <= 0) {
                        spin_up.css("display", "inline-block");
                        if (pending) {
                            return;
                        }
                        pending = true;
                        $.getJSON('http://localhost:3000/success', function success (data) {
                            setTimeout(function () {
                                goods.prepend(data);
                                pending = false;
                                spin_up.css("display", "none");
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
