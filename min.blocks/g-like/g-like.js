modules.define('g-like', ['i-bem__dom'], function(provide, BEMDOM) {
    
    BEMDOM.decl('g-like', {
        onSetMod: {
            js: {
                'inited': function () {
                    this.bindTo('click', function (e) {
                        e.stopPropagation();
                        this.toggleMod('state', 'checked', '');
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