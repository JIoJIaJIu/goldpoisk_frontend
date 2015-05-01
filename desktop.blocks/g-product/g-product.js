modules.define('g-product', ['i-bem__dom', 'router'], function (provide, BEMDOM, router) {

BEMDOM.decl('g-product', {
    onSetMod: {
        js: {
            'inited': function () {
                var showFrame = !!this.params.showFrame;
                var url = this.params.url;
                var self = this;

                var button = this.findBlockInside('g-button').domElem.get(0);
                var store = this.elem('store').get(0);

                this._blocks = {
                    goods: this.findBlockOutside('g-goods')
                }

                this.bindTo('click', function (e) {
                    //TODO: improve
                    if (e.target === button)
                        return;

                    if (e.target === store)
                        return;

                    e.preventDefault();
                    this.hasMod('active') ? this.unselect() : this.select();
                });

                this._bindLike();
            },
            '': function () {
                var desires = this.__self.getDesires.call(this);
                this.unbindFrom('click');
                desires.un('change', this._checkLikeFn);
                this._blocks = null;
            }
        }
    },

    select: function () {
        if (this.params.showFrame) {
            this.setMod('active');
            this._showFrame();
            this._blocks.goods.emit('select', this);
            return;
        }
        router.route(url);
    },

    unselect: function () {
        if (this.params.showFrame) {
            this.delMod('active');
            this._hideFrame();
            this._blocks.goods.emit('unselect', this);
        }
    },

    _bindLike: function () {
        var id = this.params.id;
        var desires = this.__self.getDesires.call(this);
        var like = this.findBlockInside('g-like');

        like.on({modName: 'state', modVal: '*'}, function (e, obj) {
            !!obj.modVal ? desires.like(id) : desires.dislike(id);
        });

        this._checkLikeFn = function () {
            desires.isLiked(id) ? like.setMod('state', 'checked') : like.delMod('state');
        }

        desires.on('change', this._checkLikeFn);
        this._checkLikeFn();
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
            that.data = blocks['g-item'](json, {js: true, titleLink: true});
            cb(null, that.data);
        })

        return true;
    },

    _showFrame: function () {
        var that = this;
        var expanded = this.__self.getFrame.call(this);
        var spin = expanded.findBlockInside('g-spin');
        var dimmer = expanded.findBlockInside('g-dimmer');

        if (expanded.openedOn(that.domElem))
            return;

        this._setPending(this.params.id);

        BEMDOM.destruct(expanded.elem('content'), true);
        spin.setMod('visible', true);
        that.__self.showExpanded.call(that);

        var requested = that._getData(function (err, data) {
            if (that.params.id != that._getPending())
                return;

            that.__self.insertData.call(that, data);
            spin.setMod('visible', false);
            dimmer.setMod('show', false);
        });

        if (requested) {
            dimmer.setMod('show', true);
        }
    },

    _hideFrame: function () {
        var frame = this.__self.getFrame.call(this);
        if (frame.openedOn(this.domElem))
            this.__self.hideExpanded.call(this);
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
        var borderLeft = parseInt(this.domElem.css('borderLeft'), 10) || 0;
        var borderRight = parseInt(this.domElem.css('borderRight'), 10) || 0;

        var boxWidth = width + paddingLeft + paddingRight + marginLeft + marginRight + borderLeft + borderRight;
        var containerWidth = this.domElem.parent().width();
        var position = this.domElem.position();

        var right = position.left + width + paddingRight + marginRight + borderRight;
        var restWidth = containerWidth - right;

        var index = Math.floor(restWidth / boxWidth)
        var productBlocks = this._getProductBlocksToRight();
        var lastBlock;
        if (index >= productBlocks.length) {
            lastBlock = productBlocks[productBlocks.length - 1];
        } else {
            lastBlock = productBlocks[index];
        }

        // TODO: move to g-frame
        // TODO: via ClientBoundingRect
        var frame = this.__self.getFrame.call(this).domElem;
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
        var difference = $(window).scrollTop() + offset;
        if (offset != 0)
            $(window).scrollTop(difference);
    },

    _setPending: function(id) {
        this.__self.__pendingId = id;
    },

    _getPending: function () {
        return this.__self.__pendingId;
    },

    _checkLikeFn: null
}, {
    getFrame: function () {
        if (this.__self.expanded)
            return this.__self.expanded;

        var html = BEMHTML.apply({
            block: 'g-frame'
        });

        var dom = BEMDOM.after(this.domElem, html);
        this.__self.expanded = this.findBlockOn(dom, 'g-frame');
        return this.__self.expanded;
    },

    getDesires: function () {
        if (this.__self.desires)
            return this.__self.desires;

        this.__self.desires = this.findBlockOutside('page').findBlockInside('g-desires');
        return this.__self.desires;
    },

    showExpanded: function (data) {
        var self = this;
        var expanded = this.__self.getFrame.call(this);
        this._reposition(expanded);
        expanded.show(this.domElem);
        expanded.on('close', function (e) {
            self.unselect();
        });
    },

    insertData: function (data) {
        var expanded = this.__self.getFrame.call(this);
        BEMDOM.update(expanded.elem('content'), BEMHTML.apply(data));
    },

    hideExpanded: function (expanded) {
        var expanded = this.__self.getFrame.call(this);
        expanded.hide();
        expanded.un('close');
    },

    __pendingId: null
});

provide(BEMDOM);

});
