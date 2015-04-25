modules.define('g-promotion', ['i-bem__dom'], function (provide, BEMDOM) {

var PLAY_INTERVAL = 5000;

BEMDOM.decl('g-promotion', {
    onSetMod: {
        js: {
            inited: function () {
                var images = this.params.images;
                this._length = images.length;
                this.selectItem(0);
            }
        },
        '': function () {
            this.slider = null;
        }
    },

    play: function () {
        this.stop();

        var self = this;
        this._interval = setInterval(function () {
            self.selectItem(self._index + 1);
        }, PLAY_INTERVAL);
    },

    stop: function () {
        if (this._interval) {
            clearInterval(this._interval);
        }
    },

    selectItem: function (index) {
        if (!this._length)
            return;

        if (index < 0) {
            index = this._length + index;
            this.selectItem(index);
            return;
        }

        if (index == this._length) {
            index = index - this._length;
            this.selectItem(index);
            return;
        }

        var item = $(this.elem('item')[index]);
        this._index = index;

        _.forEach(this.elem('item'), function (item) {
            item = $(item);
            this.delMod(item, 'active');
            this.delMod(item, 'prev');
            this.delMod(item, 'next');
        }, this);

        this.setMod(item, 'active');
        this.setMod(this._getPrevItem(), 'prev');
        this.setMod(this._getNextItem(), 'next');

        this._deselectMarkers();
        var markers = this.findBlocksInside('g-promotion-marker');
        markers[index].setMod('state', 'selected');
        this.play();
    },

    _getPrevItem: function () {
        var prevIndex = this._index - 1;
        if (prevIndex < 0)
            prevIndex = this._length - 1;

        return $(this.elem('item')[prevIndex]);
    },

    _getNextItem: function () {
        var nextIndex = this._index + 1;

        if (nextIndex == this._length)
            nextIndex = 0;

        return $(this.elem('item')[nextIndex]);
    },

    _deselectMarkers: function () {
        var markers = this.findBlocksInside('g-promotion-marker');
        _.forEach(markers, function (marker) {
            marker.delMod('state');
        });
    },

    _index: 0,
    _length: null,
    _timeout: null
}, {});

provide(BEMDOM);

});
