modules.define('g-sorting-goods', ['i-bem__dom', 'router', 'location'], function(provide, BEMDOM, router, location) {
    BEMDOM.decl('g-sorting-goods', {
        onSetMod: {
            js: {
                'inited': function () {
                    this.bindTo('param', 'click', function (e) {
                        this._onParamClick(e);
                    });
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
            this.setMod('loading', true);
            goods.setMod(goods.elem('content'), 'loading', true);
            var paginator = this.findBlockOutside('page').findBlockInside('g-paginator');

            var params = this.elemParams($(e.target));
            router.setParams({sort: params.value});
            paginator.setCurrentPage(1);

            var uri = router.getUri(router.getPath() + '/json');
            var url = uri.toString();

            $.getJSON(url, function sort (data) {
                setTimeout(function () {
                    goods.update(data);
                    goods.setMod(goods.elem('content'), 'loading', false);
                    that.setMod('loading', false);
                }, 3000);
            })
        }
    }, {});
    provide(BEMDOM)
});
