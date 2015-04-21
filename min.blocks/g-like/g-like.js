modules.define('g-like', ['i-bem__dom'], function(provide, BEMDOM) {
    
    BEMDOM.decl('g-like', {
        onSetMod: {
            js: {
                'inited': function () {
                    this.bindTo('click', function (e) {
                        e.stopPropagation();
                        this.toggleMod('state', 'checked', '');
                        var product = this.findBlockOutside('g-product');
                        product.toggleMod('like', 'yes', '');
                    });
                },
                '': function () {
                    this.unbindFrom('click');
                }
            }
        }
    }, {});

    provide(BEMDOM);
})