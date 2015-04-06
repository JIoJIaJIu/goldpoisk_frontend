modules.define('g-frame', ['i-bem__dom', 'jquery'], function (provide, BEMDOM, $) {

var ARROW_WIDTH = 38;

BEMDOM.decl('g-frame', {
    onSetMod: {
        js: function () {
            var that = this;
            this._root = null;
            this.bindTo('close', 'click', function () {
                that.hide();
            })
        },

        showed: function (mod, value) {}
    },

    show: function (node) {
        var offset = node.offset(); 
        this._reposition(offset);
        this.setMod('showed', true);
        this._moveArrayAt(offset.left + node.width() / 2 - this.domElem.offset().left - ARROW_WIDTH / 2);
        this._root = node;
    },

    hide: function () {
        this.setMod('showed', false);
        this._root = null;
    },

    openedOn: function (node) {
        return this._root === node
    },

    _reposition: function (offset) {
        var borderLeft = parseInt(this.domElem.css('borderLeft'), 10);
        var borderRight = parseInt(this.domElem.css('borderRight'), 10);
        var width = this.domElem.width() + borderLeft + borderRight;

        var marginRight = 20;
        var SHIFT = 200;

        if (offset.left + SHIFT > width ) {
            // need shift
            parentWidth = this.domElem.parent().width();
            if (parentWidth - width < offset.left) {
                // move to right
                console.log(parentWidth, width);
                this.domElem.css('left', (parentWidth - width - marginRight) + 'px');
            } else {
                // move to mid
                this.domElem.css('left', (offset.left - width / 2) + 'px');
            }
        } else {
            this.domElem.css('left', 0);
        }
    },

    _moveArrayAt: function (x) {
        this.elem('arrow').css('left', x + 'px');
    }
}, {});

provide(BEMDOM);

});
