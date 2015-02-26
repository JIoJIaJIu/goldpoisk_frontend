modules.define('g-goods', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
    BEMDOM.decl('g-goods', {
        onSetMod: {
            'js': function () {
                var that = this;
                var totalPages = that.params.totalPages;
                var currentPage = that.params.currentPage;
                var body = document.body;
                $(window).scroll(function(e) {
                    if (body.scrollHeight - body.scrollTop - $(window).height() <= 0) {
                        if (totalPages == currentPage + 1)
                            return;
                        that._request(currentPage, function (products) {
                            that.append(products);
                        })
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
            for (var i = 0; i < 10; i++) {
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