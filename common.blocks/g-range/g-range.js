modules.define('g-range', ['i-bem__dom'], function(provide, BEMDOM) {

    var MIN_RANGE = 25;

    BEMDOM.decl('g-range', {
        onSetMod: {
            js: {
                'inited': function () {
                    this.init();

                    this.bindTo(this._blocks.handlebar, 'click', this._onHandlebarClick);

                    var self = this;
                    var blocks = this._blocks;

                    this.bindTo(this._blocks.rightThumb, 'mousedown', this._onThumbMousedown);
                    this.bindTo(this._blocks.leftThumb, 'mousedown', this._onThumbMousedown);
                },
                '': function () {
                    this.undindFrom(this._blocks.handlebar, 'click', this._onHandlebarClick);
                    this.unbindFrom(this._blocks.rightThumb, 'mousedown', this._onThumbMousedown);
                    this.unbindFrom(this._blocks.leftThumb, 'mousedown', this._onThumbMousedown);
                }
            }
        },

        init: function () {
            this._blocks = {
                rightThumb: this.elem('thumb', 'right', true),
                leftThumb: this.elem('thumb', 'left', true),
                handlebar: this.elem('handlebar'),
                fill: this.elem('fill')
            };

            this._handlebarCoords = this.getCoords(this._blocks.handlebar[0]);
            this._updateFillCoords();

            if (!this.params.ticks)
                return;

            this._params = {
                width: this.params.width,
                min: this.params.min,
                max: this.params.max,
                ticks: this.params.ticks
            };

            var points = this._calcTicks(this._params);
            var ticks = this._createTicks(points);
            var context = this.findElem('ticks');
            this._insertTicks(ticks, context);
        },

        _moveAt: function (e) {
            var marginRight = e.PageX;
        },

        _calcTicks: function (params) {
            var result = []
            var width = params.width;
            var min = params.min;
            var max = params.max;
            var ticks = params.ticks + 1;

            var offset = width / ticks;
            var value = (max - min) / ticks;

            for (var i = 1; i < ticks; i++) {
                result.push({ left: offset * i, value: value * i });
            }

            return result;
        },

        _createTicks: function (points) {
            var rangeTicks = [];

            for (var i = 0, n = points.length; i < n; i++) {

                rangeTicks.push({
                    block: 'g-range__tick',
                    attrs: {
                        style: 'left:' + points[i].left + 'px;'
                    },
                    content: [
                        points[i].value,
                        {
                            tag: 'span'
                        }
                    ]
                })
            }

            return rangeTicks;
        },

        _insertTicks: function (ticks, context) {
            BEMDOM.prepend(
                context,
                BEMHTML.apply(ticks)
            );
        },

        _onHandlebarClick: function (e) {
            if (e.target.className != 'g-range__fill' && e.target != e.currentTarget)
                return;
            var leftThumb = this._fillCoords.left - this._handlebarCoords.left;
            var rightThumb = this._fillCoords.right - this._handlebarCoords.left;
            var clickPoint = e.pageX - this._handlebarCoords.left;

            if ( !this._inHandlebar(clickPoint) )
                return;

            if ( this._isLeftCloser(clickPoint, leftThumb, rightThumb) )
                this.setMinValue(clickPoint);
            else
                this.setMaxValue(this._handlebarCoords.right - this._handlebarCoords.left - clickPoint);
        },

        _onThumbMousedown: function (e) {
            e.stopPropagation();

            var data = {}
            var targetElem = $(e.target).bem('g-range__thumb');

            data.thumb = (targetElem.hasMod('right') && 'right') || (targetElem.hasMod('left') && 'left');

            this.bindToDoc('mousemove', data, this._onDocMousemove);
            this.bindToDoc('mouseup', data, this._onDocMouseup)

            return false;
        },

        _onDocMousemove: function (e) {
            var targetPoint = e.pageX - this._handlebarCoords.left;
            var rightBound = this._fillCoords.right - this._handlebarCoords.left;
            var leftBound = this._fillCoords.left - this._handlebarCoords.left;
            var handlebarWidth = this._handlebarCoords.right - this._handlebarCoords.left;
            var val;
            if (e.data.thumb == 'right') {
                val = this._handlebarCoords.right - this._handlebarCoords.left - targetPoint;
                val = this._getValInRange(val, handlebarWidth - leftBound - MIN_RANGE);
                this.setMaxValue(val);
            } else if (e.data.thumb == 'left') {
                val = targetPoint;
                val = this._getValInRange(val, rightBound - MIN_RANGE);
                this.setMinValue(val);
            }
        },

        _getValInRange: function (val, bound) {
            if (val < 0)
                return 0;
            if (val > bound)
                return bound;
            return val;
        },

        _onDocMouseup: function (e) {
            this.unbindFromDoc('mousemove', this._onDocMousemove);
            this.unbindFromDoc('mouseup', this._onDocMouseup);
        },

        _inHandlebar: function (clickPoint) {
            return clickPoint >= 0 &&
                clickPoint <= this.getCoords(this._blocks.handlebar[0]).right;
        },

        _isLeftCloser: function (clickPoint, leftThumb, rightThumb) {
            if (Math.abs(clickPoint - leftThumb) < Math.abs(clickPoint - rightThumb))
                return true;
            return false;
        },

        _updateFillCoords: function () {
            this._fillCoords = this.getCoords(this._blocks.fill[0]);
        },
        //@Вынести в JS блок утилит
        getCoords: function (elem) {
            var box = elem.getBoundingClientRect();

            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset,
                right: box.right + pageXOffset,
                bottom: box.bottom + pageYOffset
            };
        },

        setMinValue: function (val) {
            this._blocks.fill.css('margin-left', val + 'px');
            this._updateFillCoords();
        },

        setMaxValue: function (val) {
            this._blocks.fill.css('margin-right', val + 'px');
            this._updateFillCoords();
        },

        _params: {}

    }, {});

    provide(BEMDOM);
})