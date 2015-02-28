modules.define('g-expanded-item', ['i-bem__dom'], function (provide, BEMDOM) {

BEMDOM.decl('g-expanded-item', {
    onSetMod: {
        js: function () {
        }
    },

    show: function (node) {
        var offset = node.offset(); 
        this._moveArrayAt(offset.left + node.width() / 2);
        this.setMod('showed', true);
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
