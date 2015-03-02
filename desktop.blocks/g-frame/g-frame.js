modules.define('g-frame', ['i-bem__dom'], function (provide, BEMDOM) {

BEMDOM.decl('g-frame', {
    onSetMod: {
        js: function () {
            this._root = null;
        },

        showed: function (mod, value) {}
    },

    show: function (node) {
        var offset = node.offset(); 
        this._moveArrayAt(offset.left + node.width() / 2);
        this.setMod('showed', true);
        this._root = node;
    },

    hide: function () {
        this.setMod('showed', false);
        this._root = null;
    },

    openedOn: function (node) {
        return this._root === node
    },

    _moveArrayAt: function (x) {
        this.elem('arrow').css('left', x + 'px');
    },

    // move after node
    _reposition: function (node) {
    }
}, {});

provide(BEMDOM);

});
