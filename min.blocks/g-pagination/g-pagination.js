modules.define('g-pagination', ['i-bem__dom', 'jquery', 'location'], function(provide, BEMDOM, $, location) {
    BEMDOM.decl('g-pagination', {
        onSetMod: {
            'js': function () {
                var that = this;
                var goods = this.findBlockOutside('g-content').findBlockInside('g-goods');
                var body = document.body;
                var spin = $(".g-spin");
                var pending = false;
                $(window).scroll(function(e) {
                    if (body.scrollHeight - body.scrollTop - $(window).height() <= 0) {
                        spin.css("display", "inline-block");
                        if (pending == true) {
                            return;
                        }
                        pending = true;
                        goods._request(goods.params.currentPage, function (products) {
                            setTimeout(function () {
                                goods.append(products);
                                pending = false;
                                spin.css("display", "none");
                            }, 3000);
                            location.change({ params: { page: that.params.currentPage } });
                            window.location.href;
                        });
                    }
                });
            }
        }
    }, {});
    provide(BEMDOM);
})