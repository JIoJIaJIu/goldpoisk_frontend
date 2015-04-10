modules.define('g-search', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

    BEMDOM.decl('g-search', {
        onSetMod: {
            js: function() {
                /*this.bindTo('button', 'mouseenter', function (e) {
                    this.setMod('wide', true);
                });
                this.bindTo('mouseleave', function (e) {
                    this.delMod('wide')
                })*/
                var that = this;
                var title = this.findElem('title');
                this.bindTo('button', 'click', function (e) {
                    if (this.hasMod('wide')) {
                        this.delMod('wide');
                        this.setMod('loading', 'left');
                        setTimeout(function () {
                            title.text('Поиск');
                        }, 1000);
                    } else {
                        this.setMod('loading', 'right');
                        setTimeout(function () {
                            that.setMod('wide');
                            title.text('Меню');
                        }, 1000);
                    }
                    setTimeout(function () {
                        //that.toggleMod('wide');
                        that.delMod('loading');
                    }, 1000);
                })
            }
        }
    }, {});

    provide(BEMDOM);
})