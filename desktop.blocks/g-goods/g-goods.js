modules.define('g-goods', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
    BEMDOM.decl('g-goods', {
        onSetMod: {
            'js': function () {
                var that = this;
                var totalPages = that.params.totalPages;
                var currentPage = that.params.currentPage;
                var body = document.body;
                var pending = false;
                $(window).scroll(function(e) {
                    if (body.scrollHeight - body.scrollTop - $(window).height() <= 0) {
                        if (pending == true) {
                            return;
                        }
                        pending = true;
                        if (totalPages == currentPage + 1)
                            return;
                        var spin = $(".g-spin");
                        that._request(currentPage, function (products) {
                            setTimeout(function () { that.append(products); pending = false; spin.css("display", "none"); }, 3000);
                        });
                    }
                });
            }
        },
        append: function (products) {
            BEMDOM.append(
                this.domElem,
                BEMHTML.apply(products)
            );
        },
        _request: function (currentPage, cb) {
            var list = [];
            for (var i = 0; i < 8; i++) {
                list.push({
                    block: 'g-product',
                    mods: { like: 'yes', action: 'yes' },
                    url: '#',
                    title: 'Золотое Кольцо с гранатами и фианитами. Очень красивое и неебически дорогое',
                    imageUrl: '/images/good.png',
                    weight: '4.5 грамм',
                    carat: '0,07 карат',
                    price: 1000000,
                    store: 'Sunlight',
                    storeUrl: '#'
                });
            }
            cb(list);
        }
    }, {});
    provide(BEMDOM);
})