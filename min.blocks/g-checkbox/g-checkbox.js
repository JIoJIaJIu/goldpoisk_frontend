modules.define('g-checkbox', ['i-bem__dom'], function (provide, BEMDOM) {

    BEMDOM.decl('g-checkbox', {
        onSetMod: {
            js: {
                'inited': function () {
                    this.bindTo(this.elem('label'), 'click', function (e) {
                        this.toggleMod('checked');
                        e.stopPropagation();
                    });
                },
                '': function () {
                    this.unbindFrom(this.elem('label'), 'click');
                }
            }
        }
    }, {})

    provide(BEMDOM)
})
