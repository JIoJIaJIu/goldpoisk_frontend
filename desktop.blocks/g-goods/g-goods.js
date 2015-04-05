modules.define('g-goods', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
    BEMDOM.decl('g-goods', {
        onSetMod: {
            'js': function () {
                this._selected = null;
                var that = this;
                var totalPages = that.params.totalPages;
                var currentPage = that.params.currentPage;
                var body = document.body;
                var pending = false;
            },
            'loading': {
                true: function () {
                    console.log('loading start');
                },
                '': function () {
                    console.log('loading end');
                }
            }
        },

        loading: function (isLoading) {
            var sort = this.findBlockOutside('g-content').findBlockInside('g-sorting-goods');
            if (!!isLoading) {
                this.setMod(this.elem('content'), 'loading', true);
                sort.setMod('loading', true);
            } else {
                this.setMod(this.elem('content'), 'loading', false);
                sort.setMod('loading', false);
            }
        },

        append: function (products) {
            BEMDOM.append(
                this.elem('content'),
                BEMHTML.apply(products)
            );
        },

        prepend: function (products) {
            BEMDOM.prepend(
                this.elem('content'),
                BEMHTML.apply(products)
            );
        },
        update: function (products) {
            BEMDOM.update(
                this.elem('content'),
                BEMHTML.apply(products)
            );
        },
        selectProduct: function (product) {
            if (this._selected == product) {
                product.toggleMod('active');
                return;
            }
            var oldProduct = this._selected;
            this._selected = product;
            if (oldProduct) {
                product.setMod('active', true);
                oldProduct.delMod('active');
            } else {
                product.setMod('active', true);
            }
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
