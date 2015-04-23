modules.define('g-input', ['i-bem__dom'], function (provide, BEMDOM) {

    BEMDOM.decl('g-input', {
        val: function () {
            return this.elem('control').val();
        }
    }, {});

    provide(BEMDOM);
});
