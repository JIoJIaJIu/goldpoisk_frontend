modules.define('g-promotion-marker', ['i-bem__dom', 'g-promotion'], function (provide, BEMDOM) {
    BEMDOM.decl('g-promotion-marker', {
        onSetMod: {
            js: function (ok) {
                var block = this.findBlockOutside('g-promotion');
                var index = this.params.index;
                this.bindTo('click', function () {
                    block.selectItem(index);
                });
            }
        }
    }, {});

    provide(BEMDOM);
});
