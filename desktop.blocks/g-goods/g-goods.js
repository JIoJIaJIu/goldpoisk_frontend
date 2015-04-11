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
            //TODO:
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

        append: function (data) {
            var bemjson = blocks['g-goods.items'](data);

            BEMDOM.append(
                this.elem('content'),
                BEMHTML.apply(bemjson)
            );
        },

        prepend: function (data) {
            var bemjson = blocks['g-goods.items'](data);

            BEMDOM.prepend(
                this.elem('content'),
                BEMHTML.apply(bemjson)
            );
        },
        update: function (data) {
            var bemjson = blocks['g-goods.items'](data.list);
            var count = data.count
            //TODO: govnokot
            this.findBlockOutside('g-content')
                .findBlockInside('g-category-title')
                .elem('count').text('(' + count + ')');

            BEMDOM.update(
                this.elem('content'),
                BEMHTML.apply(bemjson)
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
        }
    }, {});
    provide(BEMDOM);
})
