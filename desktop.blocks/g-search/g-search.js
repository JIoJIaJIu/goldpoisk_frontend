modules.define('g-search', ['i-bem__dom', 'jquery', 'router'], function(provide, BEMDOM, $, router) {
    var DELAY = 1000;
    BEMDOM.decl('g-search', {
        onSetMod: {
            js: function() {
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
                });
                var searchInput = this.findBlockInside('g-input');
                var searchButton = this.findBlockInside('g-input__icon');
                searchButton.bindTo('click', function (e) {
                    $.getJSON('/search', searchInput.domElem.val(), function success (data) {
                        router.route('/id' + searchInput.domElem.val());
                    })
                });
            },
            '': function() {
                this.unbindFrom('button', 'click');
            }
        }
    }, {});

    provide(BEMDOM);
})