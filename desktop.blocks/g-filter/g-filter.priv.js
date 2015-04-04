/**
 * @param {Object} data
 *  @key {Array} params
 *   @of {Object} param
 *    @key {String} title
 *    @key {String} type
 *     if type == list
 *    @key {String} more like 'Ещё 5 материалов'
 *    @key {String} state open || closed
 *    @key {Array} values
 *    @of {String} value like 'Золото'
 *     if type == price
 *    @key {Integer} min
 *    @key {Integer} max
 *    @key {Integer} scale
 *    @key {Array} ticks
 *    @of {Integer} tick like 2100
 */
blocks['g-filter'] = function (data, env) {
    assertHas(data, 'params', 'Should point params');
    var params = [];
    data.params.map(function (param) {
        params.push(blocks['g-filter-param'](param, env));
    });

    return {
        block: 'g-filter',
        mods: { 'hidden': false, },
        tag: 'section',
        content: [{
                elem: 'title',
                tag: 'h1',
                content: 'Поиск по параметрам'
            }, {
                elem: 'list',
                content: params
            }, {
                elem: 'button'
            }, {
                block: 'g-button',
                mods: { type: 'gray' },
                content: 'Искать'
            }
        ]
    }
}
