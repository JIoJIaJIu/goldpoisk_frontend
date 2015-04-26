modules.define('g-promotion', ['i-bem__dom', 'keyboard__codes'], function (provide, BEMDOM, key) {

var PLAY_INTERVAL = 5000;
var ANIMATION_TIME = 300;

BEMDOM.decl('g-promotion', {
    onSetMod: {
        js: {
            inited: function () {
                var self = this;
                this._buildQueue();
                this._length = this._queue.length;
                this.selectItem(0);

                this._controlKeyFn = function (e) {
                    if (e.keyCode === key.LEFT) {
                        self.selectItem(self._index - 1);
                    } else if (e.keyCode === key.RIGHT) {
                        self.selectItem(self._index + 1);
                    }
                }

                this.bindToWin('keyup', this._controlKeyFn)
            }
        },
        '': function () {
            this.stop();
            this.unbindFromWin('keyup', this._controlKeyFn);
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

        if (this._index == index)
            return

        var self = this;

        var margin = 0;
        for (var i = index; i >= 0; i--) {
            item = this._queue[i];
            var width = item.width;
            margin = (i == index) ? -width / 2 : margin - width;

            item.item.animate({
                marginLeft: margin + 'px'
            }, ANIMATION_TIME);
        }

        for (var i = index; i < this._length; i++) {
            var item = this._queue[i];
            var width = item.width;

            if (i == index ) {
                margin = width / 2;
                continue;
            }

            item.item.animate({
                marginLeft: margin + 'px'
            }, ANIMATION_TIME);
            margin += width;
        }

        _.forEach(this._queue, function (block, i) {
            if (i == index) {
                self.setMod(block.item, 'active');
            } else {
                self.delMod(block.item, 'active');
            }
        });

        this._index = index;

        this._deselectMarkers();
        var markers = this.findBlocksInside('g-promotion-marker');
        markers[index].setMod('state', 'selected')
        this.play();
    },

    _buildQueue: function () {
        var margin = 0;
        this._queue = _.map(this.elem('item'), function (item, i) {
            item = $(item);
            var width = item.width();

            // position
            margin = (i == 0) ? -width / 2 : margin;
            item.css('margin-left', margin + 'px');
            margin += width

            return {
                item: item,
                width: width,
                height: item.height()
            }
        });
    },

    _deselectMarkers: function () {
        var markers = this.findBlocksInside('g-promotion-marker');
        _.forEach(markers, function (marker) {
            marker.delMod('state');
        });
    },

    _queue: [],
    _index: null,
    _length: null,
    _interval: null,
    _controlKeyFn: null
}, {});

provide(BEMDOM);

});
