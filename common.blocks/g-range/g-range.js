modules.define('g-range', ['i-bem__dom'], function(provide, BEMDOM) {

    BEMDOM.decl('g-range', {

        onSetMod: {
            js: {
                "inited": function () {
                    var handlebar = this.elem('handlebar');
                    var leftThumb = this.elem('thumb', 'left', true);
                    var rightThumb = this.elem('thumb', 'right', true);
                    this._blocks = {
                        handlebar: handlebar,
                        leftThumb: leftThumb,
                        rightThumb: rightThumb,
                        fill: this.elem('fill')
                    }
                    this._scale = this.params.width / (this.params.max - this.params.min);
                    this._minValue = this.params.min;
                    this._maxValue = this.params.max;
                    this._step = this.params.step;

                    var points = this._calcTicks(this.params);

                    BEMDOM.prepend(
                        this.findElem('ticks'),
                        BEMHTML.apply(this._createTicks(points))
                    );

                    this.bindTo(handlebar, 'click', this._clickFn);
                    this.bindTo(leftThumb, 'mousedown', this._thumbMouseDownFn);
                    this.bindTo(rightThumb, 'mousedown', this._thumbMouseDownFn);
                },

                "": function () {
                    this.unbindFrom('handlebar', 'click', this._clickFn);
                    this._blocks = null;
                }
            }
        },

        /**
         *
         *  @param {Number} unit
         **/
        setMinValue: function (value) {
            if (this._minValue == value)
                return;

            if (this.params.min > value)
                value = this.params.min;

            if (value + this._step >= this._maxValue)
                value = this._maxValue - this._step;

            var px = (value * this._scale) - (this.params.min * this._scale);
            this._blocks.fill.css('marginLeft', px + 'px');

            this._minValue = value;

            this.emit('change', {
                min: this._minValue,
                max: this._maxValue
            });
        },

        setMaxValue: function (value) {
            if (this._maxValue == value)
                return;

            if (this.params.max < value)
                value =  this.params.max;

            if (value - this._step <= this._minValue)
                value = this._minValue + this._step;

            var px = (value * this._scale) - (this.params.min * this._scale);
            this._blocks.fill.css('marginRight', this.params.width - px + 'px');

            this._maxValue = value;

            this.emit('change', {
                min: this._minValue,
                max: this._maxValue
            });
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

        _clickFn: function (e) {
            var point = e.pageX - this._blocks.handlebar.offset().left;

            var fillLeft = parseInt(this._blocks.fill.css('marginLeft'), 10);
            var left = this._blocks.leftThumb.position().left + fillLeft + (this._blocks.leftThumb.width() / 2);
            var right = this._blocks.rightThumb.position().left + fillLeft + (this._blocks.rightThumb.width() / 2);

            var value = point / this._scale + this.params.min;

            if (this._isLeftCloser(point, left, right)) {
                this.setMinValue(value);
            } else {
                this.setMaxValue(value);
            }
        },

        _thumbMouseDownFn: function (e) {
            e.stopPropagation();

            this._thumbMouseMoveFn = _.bind(this._thumbMouseMove, this, $(e.target));
            this.bindToDoc('mousemove',this._thumbMouseMoveFn);
            this.bindToDoc('mouseup', this._thumbMouseUpFn);

            return false;
        },

        _thumbMouseUpFn: function (e) {
            this.unbindFromDoc('mousemove', this._thumbMouseMoveFn);
        },

        _thumbMouseMove: function (thumb, e) {
            var point = e.pageX - this._blocks.handlebar.offset().left;

            var fillLeft = parseInt(this._blocks.fill.css('marginLeft'), 10);
            var left = this._blocks.leftThumb.position().left + fillLeft + (this._blocks.leftThumb.width() / 2);
            var right = this._blocks.rightThumb.position().left + fillLeft + (this._blocks.rightThumb.width() / 2);

            var value = point / this._scale + this.params.min;

            if (this.hasMod(thumb, 'left')) {
                this.setMinValue(value);
            } else {
                this.setMaxValue(value);
            }
        },

        _isLeftCloser: function (x, left, right) {
            return Math.abs(x - left) < Math.abs(x - right)
        },

        _blocks: null

    }, {});

    provide(BEMDOM);
})