modules.define('g-input', ['i-bem__dom'], function (provide, BEMDOM) {

    BEMDOM.decl('g-input', {
        val: function () {
            return this.elem('control').val();
        },

        focus: function () {
            this.elem('control').focus();
        }
    }, {});

    provide(BEMDOM);
});
