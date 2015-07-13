modules.define('g-range', ['i-bem__dom'], function(provide, BEMDOM) {

    /**
     *  px - минимальное расстояние между ползунками (для того чтобы не
     *  наезжали друг на друга)ю
     *  Note: При маленьких значениях - левый ползунок
     *  перекрывает правый
     **/
    var MIN_RANGE = 10;

    BEMDOM.decl('g-range', {
        onSetMod: {
            js: {
                'inited': function () {
                    this._blocks = {
                        rightThumb: this.elem('thumb', 'right', true),
                        leftThumb: this.elem('thumb', 'left', true),
                        handlebar: this.elem('handlebar'),
                        fill: this.elem('fill')
                    };

                    this._handlebarCoords = this.getCoords(this._blocks.handlebar[0]);
                    this._updateFillCoords();

                    var points = this._calcTicks(this.params);

                    BEMDOM.prepend(
                        this.findElem('ticks'),
                        BEMHTML.apply(this._createTicks(points))
                    );

                    this.bindTo(this._blocks.handlebar, 'click', this._onHandlebarClick);
                    this.bindTo(this._blocks.rightThumb, 'click', this._onThumbClick);
                    this.bindTo(this._blocks.leftThumb, 'click', this._onThumbClick);

                    var self = this;
                    var blocks = this._blocks;

                    this.bindTo(this._blocks.rightThumb, 'mousedown', this._onThumbMousedown);
                    this.bindTo(this._blocks.leftThumb, 'mousedown', this._onThumbMousedown);
                },
                '': function () {
                    this._blocks = null;
                    this.undindFrom(this._blocks.handlebar, 'click', this._onHandlebarClick);
                    this.unbindFrom(this._blocks.rightThumb, 'mousedown', this._onThumbMousedown);
                    this.unbindFrom(this._blocks.leftThumb, 'mousedown', this._onThumbMousedown);
                    this.unbindFromDoc('mouseup', this._onMouseUp);
                }
            }
        },

        _calcTicks: function (params) {
            var result = []

            // n разделителей делят прямую на n + 1 часть
            var parts = params.ticks + 1;

            var offset = params.width / parts;
            var value = (params.max - params.min) / parts;

            for (var i = 1; i < parts; i++) {
                result.push({ left: offset * i, value: value * i + params.min });
            }

            return result;
        },

        _createTicks: function (points) {
            return _.map(points, function (point) {
                return blocks['g-range__tick']({ point: point });
            });
        },

        _onHandlebarClick: function (e) {
            var leftThumb = this._fillCoords.left - this._handlebarCoords.left;
            var rightThumb = this._fillCoords.right - this._handlebarCoords.left;
            var clickPoint = e.pageX - this._handlebarCoords.left;
            var value;
            var data = {};

            if ( this._isLeftCloser(clickPoint, leftThumb, rightThumb) ) {
                clickPoint = (rightThumb - clickPoint) < MIN_RANGE && (rightThumb - MIN_RANGE) || clickPoint;
                value = clickPoint;
                this.setMinValue(value);
                data.thumb = 'left';
            } else {
                clickPoint = (clickPoint - leftThumb) < MIN_RANGE && (leftThumb + MIN_RANGE) || clickPoint;
                value = this._handlebarCoords.right - this._handlebarCoords.left - clickPoint;
                this.setMaxValue(value);
                data.thumb = 'right';
            }

            data.unit = value;
            this.emit('changeInput', data);
        },

        _onThumbMousedown: function (e) {
            e.stopPropagation();

            var targetElem = $(e.target).bem('g-range__thumb');

            var thumb = (targetElem.hasMod('right') && 'right') || (targetElem.hasMod('left') && 'left');

            this._mouseMoveFn = _.bind(this._onMouseMove, this, thumb);
            this.bindToDoc('mousemove',this._mouseMoveFn);
            this.bindToDoc('mouseup', this._onMouseUp);

            return false;
        },

        _onMouseMove: function (thumb, e) {
            var targetPoint = e.pageX - this._handlebarCoords.left;
            var rightBound = this._fillCoords.right - this._handlebarCoords.left;
            var leftBound = this._fillCoords.left - this._handlebarCoords.left;
            var handlebarWidth = this._handlebarCoords.right - this._handlebarCoords.left;
            var val;
            var data = {}
            if (thumb == 'right') {
                val = this._handlebarCoords.right - this._handlebarCoords.left - targetPoint;
                val = this._getValInRange(val, handlebarWidth - leftBound - MIN_RANGE);
                this.setMaxValue(val);
                data.thumb = 'right';
            } else if (thumb == 'left') {
                val = targetPoint;
                val = this._getValInRange(val, rightBound - MIN_RANGE);
                this.setMinValue(val);
                data.thumb = 'left';
            }

            data.unit = val;
            this.emit('changeInput', data);
        },

        _onThumbClick: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },

        _getValInRange: function (val, bound) {
            if (val < 0)
                return 0;
            if (val > bound)
                return bound;
            return val;
        },

        _onMouseUp: function (e) {
            this.unbindFromDoc('mousemove', this._onMouseMoveFn);
        },

        _isLeftCloser: function (clickPoint, leftThumb, rightThumb) {
            return Math.abs(clickPoint - leftThumb) < Math.abs(clickPoint - rightThumb)
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

        getLowerBound: function () {
            return this.params.min;
        },

        getUpperBound: function () {
            return this.params.max;
        },

        getWidth: function () {
            return this.params.width;
        },

        _blocks: null

    }, {});

    provide(BEMDOM);
})