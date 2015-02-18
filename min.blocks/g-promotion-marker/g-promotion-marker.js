modules.define('g-promotion-marker', ['i-bem__dom', 'g-promotion'], function (provide, BEMDOM) {
    BEMDOM.decl('g-promotion-marker', {
        onSetMod: {
            js: function (ok) {
                var block = this.findBlockOutside('g-promotion');
                this.bindTo('click', function () {
                    block.slider.$PlayTo(this.params.index || 0);
                    block.deselectMarkers();
                    this.setMod('state', 'selected');
                });
            }
        }
    }, {});

    provide(BEMDOM);
});
