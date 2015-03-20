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
                var dimmer = expanded.findBlockInside('g-dimmer');
                $(".g-dimmer").addClass('g-dimmer_show');
                    if (e.target === button)
                    return;

                if (e.target === store)
                    return;

                e.preventDefault();
                if (expanded.openedOn(that.domElem)) {
                    that.__self.hideExpanded.call(that);
                    return;
                }

                that._getData(function (err, data) {
                    that.__self.showExpanded.call(that, data);
                });
            });
        }
    },

    _getData: function (cb) {
        var that = this;

        if (this.data)
            return cb(null, this.data);

        $.getJSON(this.params.url, function (json) {
            that.data = json;
            cb(null, json);
        })
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
            block: 'g-frame'
        });

        var dom = BEMDOM.after(this.domElem, html);
        this.__self.expanded = this.findBlockOn(dom, 'g-frame');
        return this.__self.expanded;
    },

    showExpanded: function (data) {
        console.log(data);
        var expanded = this.__self.getExpanded.call(this);
        this._reposition(expanded);
        expanded.show(this.domElem);
        console.log(expanded);
        BEMDOM.update(expanded.elem('content'), BEMHTML.apply(data));
        setTimeout(function () {$(".g-dimmer").removeClass('g-dimmer_show')}, 3000);
    },

    hideExpanded: function (expanded) {
        var expanded = this.__self.getExpanded.call(this);
        expanded.hide();
    }
});

provide(BEMDOM);

});
