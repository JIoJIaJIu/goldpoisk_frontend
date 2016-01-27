modules.define('g-price-control', ['i-bem__dom'], function (provide, BEMDOM) {

    BEMDOM.decl('g-price-control', {
        onSetMod: {
            js: {
                "inited": function () {
                    var self = this;
                    var minInput = this.findBlockInside({ block: 'g-input', modName: 'min', modVal: true });
                    var maxInput = this.findBlockInside({ block: 'g-input', modName: 'max', modVal: true });
                    var range = this.findBlockInside('g-range');

                    this._blocks = {
                        minInput: minInput,
                        maxInput: maxInput,
                        range: range
                    };

                    minInput.on('change', function (e, value) {
                        range.setMinValue(value);
                    });

                    maxInput.on('change', function (e, value) {
                        range.setMaxValue(value);
                    });

                    range.on('change', function (e, data) {
                        minInput.setVal(data.min);
                        maxInput.setVal(data.max);
                    });
                }
            }
        }
/*        onSetMod: {
            js: {
                "inited": function () {
                    this._blocks = {
                        minInput: this.findBlockInside({ block: 'g-input', modName: 'min', modVal: true }),
                        maxInput: this.findBlockInside({ block: 'g-input', modName: 'max', modVal: true }),
                        range: this.findBlockInside('g-range')
                    }

                    this._blocks.minInput.on('change', _.bind(this._setMinOnRange, this));
                    this._blocks.maxInput.on('change', _.bind(this._setMaxOnRange, this));
                    this._blocks.range.on('update', _.bind(this._setInputValue, this));
                },
                "": function () {
                    this._blocks.minInput.un('change');
                    this._blocks.maxInput.un('change');
                    this._blocks.range.un('update');
                    this._blocks = null;

                }
            }
        },
/*
        _setMinOnRange: function (e, value) {
            var val = value;

            var rangeLowerBound = this._blocks.range.getLowerBound();
            var rangeUpperBound = this._blocks.range.getUpperBound();
            var rangeWidth = this._blocks.range.getWidth();
            var currentMax = this._getCurrentMaxValue();
            var handlebarBorderWidth = parseFloat(this._blocks
                                                    .range
                                                    .findElem('handlebar')
                                                    .css('borderWidth'));

            val = this._calcLeftMargin(val, rangeLowerBound, rangeUpperBound, rangeWidth, handlebarBorderWidth);

            val = (value < rangeLowerBound && "0") ||
                (value > currentMax &&
                    this._blocks.maxInput.setVal(value) &&
                    this._blocks.minInput.setVal(currentMax)) ||
                (value > rangeUpperBound && rangeWidth) ||
                val;

            this._blocks.range.setMinValue(parseInt(val), false);
        },

        _setMaxOnRange: function (e, value) {
            var val = value;

            var rangeLowerBound = this._blocks.range.getLowerBound();
            var rangeUpperBound = this._blocks.range.getUpperBound();
            var rangeWidth = this._blocks.range.getWidth();
            var currentMin = this._getCurrentMinValue();
            var handlebarBorderWidth = parseFloat(this._blocks
                                                      .range
                                                      .findElem('handlebar')
                                                      .css('borderWidth'));

            val = this._calcRightMargin(val, rangeLowerBound, rangeUpperBound, rangeWidth, handlebarBorderWidth);
            val = ((value > rangeUpperBound || value == 0 || value < rangeLowerBound || value < currentMin) && "0") ||
                val;

            this._blocks.range.setMaxValue(parseInt(val), false);
        },

        _getCurrentMaxValue: function () {
            return this._blocks.maxInput.val() || this._blocks.range.getUpperBound();
        },

        _getCurrentMinValue: function () {
            return this._blocks.minInput.val();
        },

        /**
         *  Метод конвертирует значение цены в правый отступ
         *
         *  @param {Number} val - конвертируемое значение цены
         *  @param {Number} bottomBound - минимальное значение цены на ползунке
         *  @param {Number} upperBound - максимальное значение цены на ползунке
         *  @param {Number} totlaWidth - ширина ползунка в условных единицах
         *  @param {Number} border - толщина границы ползунка
         *  @returns {Number} условные единицы соответствующие цене
         **
        _calcRightMargin: function (val, bottomBound, upperBound, totlaWidth, border) {
             return totlaWidth - (totlaWidth * (val - bottomBound) / (upperBound - bottomBound)) - border;
        },

        /**
         *  Метод конвертирует значение цены в левый отступ
         *
         *  @param {Number} val - конвертируемое значение цены
         *  @param {Number} bottomBound - минимальное значение цены на ползунке
         *  @param {Number} upperBound - максимальное значение цены на ползунке
         *  @param {Number} totlaWidth - ширина ползунка в условных единицах
         *  @param {Number} border - толщина границы ползунка
         *  @returns {Number} условные единицы соответствующие цене
         **
        _calcLeftMargin: function (val, bottomBound, upperBound, totalWidth, border) {
             return ((val - bottomBound) * totalWidth / (upperBound - bottomBound)) - border;
        },

        _setInputValue: function (e, data) {
            var side = (data.min || data.min == 0) && 'left' || (data.max || data.max == 0) && 'right';
            var unit = data.min || data.max || 0;
            var val = this._convertToPrice(unit, side);
            if (side == 'left') {
                this._blocks.minInput.setVal(val);
            } else if (side == 'right') {
                this._blocks.maxInput.setVal(val);
            }
        },

        _convertToPrice: function (unit, side) {
            var rangeLowerBound = this._blocks.range.getLowerBound();
            var rangeUpperBound = this._blocks.range.getUpperBound();
            var rangeWidth = this._blocks.range.getWidth();
            var handlebarBorderWidth = parseFloat(this._blocks
                                                      .range
                                                      .findElem('handlebar')
                                                      .css('borderWidth'));
            if (side == 'left') {
                unit = unit == 0 && rangeLowerBound ||
                (((unit + handlebarBorderWidth) * (rangeUpperBound - rangeLowerBound) / this._blocks.range.getWidth()) + rangeLowerBound);
                return unit;
            }

            unit = unit == 0 && rangeUpperBound ||
            (((rangeUpperBound - rangeLowerBound) * (rangeWidth - unit - handlebarBorderWidth) / rangeWidth) + rangeLowerBound) ;

            return unit;
        },

        _blocks: null
*/
    }, {});

    provide(BEMDOM);
});