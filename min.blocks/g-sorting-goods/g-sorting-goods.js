modules.define('g-sorting-goods', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
    BEMDOM.decl('g-sorting-goods', {
        _onParamClick: function(e) {
            var goods = this.findBlockOutside('g-content').findBlockInside('g-goods');
            var _target = $(e.currentTarget);
            this.setMod(this.elem('param'), 'selected', false);
            this.setMod(_target, 'selected', true);
            goods.setMod('loading', true);
            $.getJSON('http://localhost:3000/sortparam', function sort (data) {
                setTimeout(function () {
                    goods.update(data);
                    goods.setMod('loading', false);
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