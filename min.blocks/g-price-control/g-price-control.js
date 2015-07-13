modules.define('g-price-control', ['i-bem__dom'], function (provide, BEMDOM) {

    BEMDOM.decl('g-price-control', {
        onSetMod: {
            js: {
                "inited": function () {
                    this.init();

                    this._blocks.minInput.on('change', _.bind(this._setMinOnRange, this));
                    this._blocks.maxInput.on('change', _.bind(this._setMaxOnRange, this));
                    this._blocks.range.on('changeInput', _.bind(this._setInputValue, this));
                },
                "": function () {
                    this._blocks = null;
                }
            }
        },

        init: function () {
            this._blocks = {
                minInput: this.findBlockInside({ block: 'g-input', modName: 'min', modVal: true }),
                maxInput: this.findBlockInside({ block: 'g-input', modName: 'max', modVal: true }),
                range: this.findBlockInside('g-range')
            }
        },

        _setMinOnRange: function (e, data) {
            var val = data.value;

            var rangeLowerBound = this._blocks.range.getLowerBound();
            var rangeUpperBound = this._blocks.range.getUpperBound();
            var rangeWidth = this._blocks.range.getWidth();
            var currentMax = this._getCurrentMaxValue();
            var handlebarBorderWidth = parseFloat(this._blocks
                                                    .range
                                                    .findElem('handlebar')
                                                    .css('borderWidth'));

            val = this._calcLeftMargin(val, rangeLowerBound, rangeUpperBound, rangeWidth, handlebarBorderWidth);

            val = (data.value < rangeLowerBound && "0") ||
                (data.value > currentMax && 
                    this._blocks.maxInput.setVal(data.value) &&
                    this._blocks.minInput.setVal(currentMax)) ||
                (data.value > rangeUpperBound && rangeWidth) ||
                val;

            this._blocks.range.setMinValue(parseInt(val));
        },

        _setMaxOnRange: function (e, data) {
            var val = data.value;

            var rangeLowerBound = this._blocks.range.getLowerBound();
            var rangeUpperBound = this._blocks.range.getUpperBound();
            var rangeWidth = this._blocks.range.getWidth();
            var currentMin = this._getCurrentMinValue();
            var handlebarBorderWidth = parseFloat(this._blocks
                                                      .range
                                                      .findElem('handlebar')
                                                      .css('borderWidth'));

            val = this._calcRightMargin(val, rangeLowerBound, rangeUpperBound, rangeWidth, handlebarBorderWidth);
            val = ((data.value > rangeUpperBound || data.value == 0 || data.value < rangeLowerBound || data.value < currentMin) && "0") ||
                val;

            this._blocks.range.setMaxValue(parseInt(val));
        },

        _getCurrentMaxValue: function () {
            return this._blocks.maxInput.val();
        },

        _getCurrentMinValue: function () {
            return this._blocks.minInput.val();
        },

        _calcRightMargin: function (val, bottomBound, upperBound, totlaWidth, border) {
            /**
             *  Метод конвертирует значение цены в правый отступ
             *
             *  @param {Number} val - конвертируемое значение цены
             *  @param {Number} bottomBound - минимальное значение цены на ползунке
             *  @param {Number} upperBound - максимальное значение цены на ползунке
             *  @param {Number} totlaWidth - ширина ползунка в условных единицах
             *  @param {Number} border - толщина границы ползунка
             *  @returns {Number} условные единицы соответствующие цене
             **/
             return totlaWidth - (totlaWidth * (val - bottomBound) / (upperBound - bottomBound)) - border;
        },

        _calcLeftMargin: function (val, bottomBound, upperBound, totalWidth, border) {
            /**
             *  Метод конвертирует значение цены в левый отступ
             *
             *  @param {Number} val - конвертируемое значение цены
             *  @param {Number} bottomBound - минимальное значение цены на ползунке
             *  @param {Number} upperBound - максимальное значение цены на ползунке
             *  @param {Number} totlaWidth - ширина ползунка в условных единицах
             *  @param {Number} border - толщина границы ползунка
             *  @returns {Number} условные единицы соответствующие цене
             **/
             return ((val - bottomBound) * totalWidth / (upperBound - bottomBound)) - border;
        },

        _setInputValue: function (e, data) {
            var val = this._convertToPrice(data.unit, data.thumb);
            if (data.thumb == 'left') {
                this._blocks.minInput.setVal(val);
            } else if (data.thumb == 'right') {
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
            if (side == 'left')
                unit = ((unit + handlebarBorderWidth) * (rangeUpperBound - rangeLowerBound) / this._blocks.range.getWidth()) + rangeLowerBound;
            else
                unit = ((rangeUpperBound - rangeLowerBound) * (rangeWidth - unit - handlebarBorderWidth) / rangeWidth) + rangeLowerBound;
            return unit;
        },

        _blocks: null

    }, {});

    provide(BEMDOM);
});