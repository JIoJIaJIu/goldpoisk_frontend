modules.define('g-product', ['i-bem__dom'], function (provide, BEMDOM) {

BEMDOM.decl('g-product', {
    onSetMod: {
        js: function () {
            var expanded = this.__self.getExpanded.call(this);
            var that = this;

            this.bindTo('click', function (e) {
                e.preventDefault();
                if (expanded.openedOn(that.domElem)) {
                    that.__self.hideExpanded.call(that);
                    return;
                }

                that.__self.showExpanded.call(this);
            });
        }
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
        if (index > productBlocks.length) {
            lastBlock = productBlocks[productBlocks.length - 1];
        } else {
            lastBlock = productBlocks[index];
        }
        BEMDOM.after(lastBlock.domElem, expanded.domElem);
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
    }

}, {
    getExpanded: function () {
        if (this.__self.expanded)
            return this.__self.expanded;

        var html = BEMHTML.apply({
            block: 'g-expanded-item'
        });

        var dom = BEMDOM.after(this.domElem, html);
        this.__self.expanded = this.findBlockOn(dom, 'g-expanded-item');
        return this.__self.expanded;
    },

    showExpanded: function () {
        var expanded = this.__self.getExpanded.call(this);
        this._reposition(expanded);

        var params = this.params;
        expanded.show(this.domElem);
        var html = blocks['g-item']({
            title: params.title,
            features: params.features,
            item: params.item,
            gallery: {
                images: params.images,
                mainImg: params.images[0]
            }
        });
        BEMDOM.update(expanded.domElem, BEMHTML.apply(html));
    },

    hideExpanded: function (expanded) {
        var expanded = this.__self.getExpanded.call(this);
        expanded.hide();
    }
});

provide(BEMDOM);

});
