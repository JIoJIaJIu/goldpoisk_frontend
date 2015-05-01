modules.define('g-goods', ['i-bem__dom', 'logger', 'router', 'keyboard__codes'], function(provide, BEMDOM, logger, router, key) {
    BEMDOM.decl('g-goods', {
        onSetMod: {
            js: {
                'inited': function () {
                    this._selected = null;
                    var self = this;
                    var pending = false;
                    this._totalCount = this.params.count;
                    var currentProduct = null;
                    this._products = this.params.products;

                    this.on('select', function(e, data) {
                        if (self._selected && self._selected != data.product.params.id) {
                            var prevProduct = self._getProduct(self._selected);
                            prevProduct.delMod('active');
                        }
                        self._selected = data.isSelected ? data.product.params.id : null;
                        var prev, next;
                        self.bindToDoc('keyup', function (e) {
                            if (e.which == key.LEFT) {
                                prev = self._getPrevProduct(self._selected);
                                if (!prev)
                                    return;
                                prev.toggleMod('active');
                            } else if (e.which == key.RIGHT) {
                                next = self._getNextProduct(self._selected);
                                if (!next)
                                    return;
                                next.toggleMod('active');
                            }
                        });
                    });

                    this.on('unselect', function (e, data) {
                        self.unbindFromDoc('keyup');
                    });

                    var sorting = this.findBlockOutside('g-content').findBlockInside('g-sorting-goods');
                    if (sorting)
                        sorting.on('sort', function (e, value) {
                            self.loading(true);

                            var paginator = self.findBlockOutside('page').findBlockInside('g-paginator');

                            router.setParams({sort: value});
                            paginator.setCurrentPage(1);

                            var uri = router.getUri(router.getPath() + '/json');
                            var url = uri.toString();

                            if (self._products.length == self._totalCount) {
                                var sortFunc = {
                                    name: function (a, b) {
                                        if (a.title > b.title)
                                            return 1;
                                        return -1;
                                    },
                                    price: function (a, b) {
                                        if (a.minPrice > b.minPrice)
                                            return 1;
                                        return -1;
                                    },
                                    tprice: function (a, b) {
                                        if (a.minPrice > b.minPrice)
                                            return -1;
                                        return 1;
                                    }
                                }
                                self._products.sort(sortFunc[value]);
                                var data = {
                                    count: self._products.length,
                                    list: self._products
                                };
                                self.update(data);
                                self.loading(false);
                                return;
                            }
                            $.getJSON(url, function sort (data) {
                                self.update(data);
                                self.loading(false);
                            })
                        });

                    this._logger = logger.Logger('g-goods');
                },

                '': function () {
                    this._logger.finalize();
                    this._logger = null;
                    this.un('select');
                    this.un('unselect');
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
                this._logger.throw('Should point {Array} list');

            this._products = this._products.concat(list);

            var bemjson = blocks['g-goods.items'](list, {showFrame: true});

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
                this._logger.throw('Should point {Array} list');

            this._products = list.concat(this._products);

            var bemjson = blocks['g-goods.items'](list, {showFrame: true});

            BEMDOM.prepend(
                this.elem('content'),
                BEMHTML.apply(bemjson)
            );
        },

        /**
         * There is method self replaces own content with new data
         * @param {Object} data
         *   @key {Array} list
         *   @key {Number} count
         */
        update: function (data) {
            if (!_.isObject(data))
                this._logger.throw('Should point {Object} data');

            var count = this._totalCount = data.count;
            var list = this._products = data.list;

            if (!_.isNumber(count))
                this._logger.throw('Should point {Number} count');

            if (!_.isArray(list))
                this._logger.throw('Should point {Array} list');

            var bemjson = blocks['g-goods.items'](list, {showFrame: true});
            //TODO: govnokot
            this.findBlockOutside('g-content')
                .findBlockInside('g-category-title')
                .elem('count').text('(' + count + ')');

            BEMDOM.update(
                this.elem('content'),
                BEMHTML.apply(bemjson)
            );
        },

        _getPrevProduct: function (product) {
            var currentIndex = this._getCurrentIndex(this._selected);
            if (!currentIndex)
                return null;
            var prevIndex = (currentIndex === 0) ? -1 : currentIndex - 1;
            return ~prevIndex ? this.findBlocksInside('g-product')[prevIndex] : null;
        },

        _getNextProduct: function (product) {
            var currentIndex = this._getCurrentIndex(this._selected);
            if (currentIndex > this._products.length)
                return null;
            var nextIndex = (currentIndex === this._products.length - 1) ? -1 : currentIndex + 1;
            return ~nextIndex ? this.findBlocksInside('g-product')[nextIndex] : null;
        },

        _getCurrentIndex: function (id) {
            return _.findIndex(this._products, function (product) {
                return id == product.id;
            });
        },

        _getProduct: function (id) {
            var index = this._getCurrentIndex(id);
            return this.findBlocksInside('g-product')[index];
        },

        _products: [],
        _totalCount: null,
        _selected: null
    }, {});
    provide(BEMDOM);
})
