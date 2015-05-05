modules.define('g-sorting-goods', ['i-bem__dom', 'router', 'location'], function(provide, BEMDOM, router, location) {
    BEMDOM.decl('g-sorting-goods', {
        onSetMod: {
            js: {
                'inited': function () {
                    this.bindTo('param', 'click', function (e) {
                        this._onParamClick(e);
                    });

                    // Разбор адресной строки для инициализации
                    switch (router.getParam('sort')) {
                        case 'name':
                            this.setMod(this.elem('param', 'type', 'name'), 'selected', true);
                            break;
                        case 'price':
                            this.setMod(this.elem('param', 'type', 'price'), 'selected', true);
                            break;
                        case 'tprice':
                            this.setMod(this.elem('param', 'type', 'tprice'), 'selected', true);
                            break;
                        default:
                            break;
                    }
                },

                '': function () {
                    this.unbindFrom('param', 'click');
                }
            }
        },

        _onParamClick: function(e) {
            e.stopPropagation();
            e.preventDefault();
            var that = this;
            var goods = this.findBlockOutside('g-content').findBlockInside('g-goods');
            //TODO: Хуйяня!
            var target = $(e.currentTarget);

            this.setMod(this.elem('param'), 'selected', false);
            this.setMod(target, 'selected', true);
            var params = this.elemParams($(e.target));
            this.emit('sort', params.value);
            /*
            goods.loading(true);
            var paginator = this.findBlockOutside('page').findBlockInside('g-paginator');

            //var params = this.elemParams($(e.target));
            router.setParams({sort: params.value});
            paginator.setCurrentPage(1);

            var uri = router.getUri(router.getPath() + '/json');
            var url = uri.toString();

            if (goods._products.length == goods._totalCount) {
                goods._products.sort();
                goods.update(goods._products);
                return;
            }
            $.getJSON(url, function sort (data) {
                setTimeout(function () {
                    goods.update(data);
                    goods.loading(false);
                }, 3000);
            })
            */
        }



    }, {});
    provide(BEMDOM)
});
