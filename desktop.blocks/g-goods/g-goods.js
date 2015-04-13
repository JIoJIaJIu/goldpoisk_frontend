modules.define('g-goods', ['i-bem__dom', 'logger'], function(provide, BEMDOM, logger) {
    BEMDOM.decl('g-goods', {
        onSetMod: {
            js: {
                'inited': function () {
                    this._selected = null;
                    var that = this;
                    var totalPages = that.params.totalPages;
                    var currentPage = that.params.currentPage;
                    var body = document.body;
                    var pending = false;

                    this._logger = logger.Logger('g-goods');
                },

                '': function () {
                    this._logger.finalize();
                    this._logger = null;
                }
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

        /**
         * Method for appending g-products to the end of container
         * @param {Array} list
         */
        append: function (list) {
            if (!_.isArray(list))
                this._logger.error('Should point {Array} list');

            var bemjson = blocks['g-goods.items'](list, {js: true});

            BEMDOM.append(
                this.elem('content'),
                BEMHTML.apply(bemjson)
            );
        },

        /**
         * Method for prepending g-products to the end of container
         * @param {Array} list
         */
        prepend: function (list) {
            if (!_.isArray(list))
                this._logger.error('Should point {Array} list');

            var bemjson = blocks['g-goods.items'](list, {js: true});

            BEMDOM.prepend(
                this.elem('content'),
                BEMHTML.apply(bemjson)
            );
        },

        /**
         * There is method that replaces own content with new data
         * @param {Object} data
         *   @key {Array} list
         *   @key {Number} count
         */
        update: function (data) {
            if (!_.isObject(data))
                this._logger.error('Should point {Object} data');

            var count = data.count;
            var list = data.list;

            if (!_.isNumber(count))
                this._logger.error('Should point {Number} count');

            if (!_.isArray(list))
                this._logger.error('Should point {Array} list');

            var bemjson = blocks['g-goods.items'](list, {js: true});
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
