/**
 *  @param {Object} data
 *    @key {Array} params
 *      @of {Object} param
 *        @key {String} title
 *        @key {String} type
 *        @key {String} [view], default='list'
 *
 *  if type == list, default
 *    @key {Number} count
 *    @key {String} state, 'opened'|'closed', default='opened'
 *    @key {Array} values
 *      @of {String} value, example='Золото'
 *
 *  if type == price
 *    @key {Integer} min
 *    @key {Integer} max
 *    @key {Integer} scale
 *    @key {Array} ticks
 *      @of {Integer} tick, example=2100
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
