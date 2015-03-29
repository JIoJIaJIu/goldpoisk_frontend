modules.define('g-sorting-goods', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
    BEMDOM.decl('g-sorting-goods', {
        _onParamClick: function(e) {
            var that = this;
            var goods = this.findBlockOutside('g-content').findBlockInside('g-goods');
            var _target = $(e.currentTarget);
            this.setMod(this.elem('param'), 'selected', false);
            this.setMod(_target, 'selected', true);
            this.setMod('loading', true);
            goods.setMod(goods.elem('content'), 'loading', true);
            //TODO:
            var url = $(e.target).data('bem')['g-sorting-goods__param'].url;

            $.getJSON(url, function sort (data) {
                setTimeout(function () {
                    goods.update(data);
                    goods.setMod(goods.elem('content'), 'loading', false);
                    that.setMod('loading', false);
                }, 3000);
            })
        }
    }, {
        live: function () {
            this.liveBindTo('param', 'click', function(e) {
                this._onParamClick(e);
            });
            return false; // Если инициализация блока не может быть отложена
        }
    });
    provide(BEMDOM)
});
