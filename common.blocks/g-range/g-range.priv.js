/**
 *  @param {Object} data
 *      @key {Object} point
 *          @key {Number} left
 *          @key {Number} value
 **/
blocks['g-range__tick'] = function (data, env) {
    assertHas(data, 'point', 'Should point point');
    return {
        block: 'g-range__tick',
        attrs: {
            style: 'left:' + data.point.left + 'px;'
        },
        content: [
            data.point.value,
            {
                tag: 'span'
            }
        ]
    }
}