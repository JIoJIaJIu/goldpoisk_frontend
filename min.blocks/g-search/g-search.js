modules.define('g-search', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

    BEMDOM.decl('g-search', {
        onSetMod: {
            js: function() {
                var DELAY = 1000;
                var that = this;
                var title = this.findElem('title');
                this.bindTo('button', 'click', function (e) {
                    if (this.hasMod('wide')) {
                        this.delMod('wide');
                        this.setMod('loading', 'left');
                        setTimeout(function () {
                            title.text('Поиск');
                        }, DELAY);
                    } else {
                        this.setMod('loading', 'right');
                        setTimeout(function () {
                            that.setMod('wide');
                            title.text('Меню');
                        }, DELAY);
                    }
                    setTimeout(function () {
                        that.delMod('loading');
                    }, DELAY);
                })
            },
            '': function() {
                this.unbindFrom('button', 'click');
            }
        }
    }, {});

    provide(BEMDOM);
})