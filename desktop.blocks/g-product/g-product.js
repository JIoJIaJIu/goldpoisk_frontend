modules.define('g-product', ['i-bem__dom', 'jquery'], function (provide, BEMDOM, $) {

BEMDOM.decl('g-product', {
    onSetMod: {
        js: function () {
            var expanded = this.__self.getExpanded.call(this);
            var that = this;

            var button = this.findBlockInside('g-button').domElem.get(0);
            var store = this.elem('store').get(0);

            //TODO: memory leaks
            this.bindTo('click', function (e) {
                //TODO: improve
                if (e.target === button)
                    return;

                if (e.target === store)
                    return;
                e.preventDefault();
                if (expanded.openedOn(that.domElem)) {
                    that.__self.hideExpanded.call(that);
                    return;
                } else {
                    BEMDOM.destruct(expanded.elem('content'), true);
                    that.__self.showExpanded.call(that);
                }

                var requested = that._getData(function (err, data) {
                    that.__self.insertData.call(that, data);
                    $(".g-dimmer").removeClass('g-dimmer_show');
                });

                if (requested) {
                    $(".g-dimmer").addClass('g-dimmer_show');
                }
            });
        }
    },

    _getData: function (cb) {
        /**
         *  @param {Function} cb
         *
         *  @return {Boolean} requested
         **/
        var that = this;

        if (this.data) {
            cb(null, this.data);
            return false;
        }

        $.getJSON(this.params.url, function (json) {
            that.data = json;
            cb(null, json);
        })

        return true;
    },

    /**
     * TODO: refactoring with lodash
     * TODO: measure time of evaluation
     * TODO: don't move on the same position
     * Moving expanded to the last item in the row
     */
    _reposition: function (expanded) {
        var width = this.domElem.width();
        var paddingLeft = parseInt(this.domElem.css('paddingLeft'), 10) || 0;
        var paddingRight = parseInt(this.domElem.css('paddingRight'), 10) || 0;
        var marginLeft = parseInt(this.domElem.css('marginLeft'), 10) || 0;
        var marginRight = parseInt(this.domElem.css('marginRight'), 10) || 0;

        var boxWidth = width + paddingLeft + paddingRight + marginLeft + marginRight;
        var containerWidth = this.domElem.parent().width()
        var position = this.domElem.position();

        var right = position.left + width + paddingRight + marginRight;
        var restWidth = containerWidth - right;

        var index = Math.round(restWidth / boxWidth)
        var productBlocks = this._getProductBlocksToRight();
        var lastBlock;
        if (index >= productBlocks.length) {
            lastBlock = productBlocks[productBlocks.length - 1];
        } else {
            lastBlock = productBlocks[index];
        }

        // TODO: move to g-frame
        // TODO: via ClientBoundingRect
        var frame = this.__self.getExpanded.call(this).domElem;
        var paddingTop = parseInt(frame.css('paddingTop'), 10) || 0;
        var paddingBottom = parseInt(frame.css('paddingBottom'), 10) || 0;
        var marginTop = parseInt(frame.css('marginTop'), 10) || 0;
        var marginBottom = parseInt(frame.css('marginBottom'), 10) || 0;
        var borderTop = parseInt(frame.css('borderTop'), 10) || 0;
        var borderBottom = parseInt(frame.css('borderBottom'), 10) || 0;

        var height = frame.height() + paddingBottom + paddingTop + marginTop + marginBottom
                        + borderTop + borderBottom;
        var oldTop = this.domElem.offset().top;

        BEMDOM.after(lastBlock.domElem, expanded.domElem);

        var offset = oldTop == this.domElem.offset().top ? 0 : -height;
        this._offsetScroll(offset);
    },

    /**
     * TODO: refactoring with lodash
     * TODO: measure time of evaluation
     * Get list of product blocks sliced to right
     */
    _getProductBlocksToRight: function () {
        var parent = this.findBlockOutside('g-goods');
        var blocks = parent.findBlocksInside('g-product');
        var list = [];
        var currentIndex = -1;

        for (var i = 0, length = blocks.length; i < length; i++) {
            var block = blocks[i];
            if (!~currentIndex) {
                if (block === this) {
                    currentIndex = i;
                    list.push(block)
                }
                continue;
            }
            list.push(block);
        }
        return list;
    },
    /**
     * TODO: refactoring
     * Comment this
     **/
    _offsetScroll: function (offset) {
        var difference = $("body").scrollTop() + offset;
        if (offset != 0)
            $("body").scrollTop(difference);
    }

}, {
    getExpanded: function () {
        if (this.__self.expanded)
            return this.__self.expanded;

        var html = BEMHTML.apply({
            block: 'g-frame'
        });

        var dom = BEMDOM.after(this.domElem, html);
        this.__self.expanded = this.findBlockOn(dom, 'g-frame');
        return this.__self.expanded;
    },

    showExpanded: function (data) {
        var expanded = this.__self.getExpanded.call(this);
        this._reposition(expanded);
        expanded.show(this.domElem);
    },

    insertData: function (data) {
        var expanded = this.__self.getExpanded.call(this);
        BEMDOM.update(expanded.elem('content'), BEMHTML.apply(data));
    },

    hideExpanded: function (expanded) {
        var expanded = this.__self.getExpanded.call(this);
        expanded.hide();
    }
});

provide(BEMDOM);

});
