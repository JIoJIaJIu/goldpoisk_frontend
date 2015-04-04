/**
 * @param {Object} data
 *  @key {String} title
 *  @key {String} type
 * if type == list
 *  @key {String} more like 'Ещё 5 материалов'
 *  @key {String} state open || closed
 *  @key {Array} values
 *   @of {Object} item
 *     @key {Number} id
 *     @key {String} name
 * if type == price
 *  @key {Integer} min
 *  @key {Integer} max
 *  @key {Integer} scale
 *  @key {Array} ticks
 *   @of {Integer} tick like 2100
 */
blocks['g-filter-param'] = function (data, env) {
    switch (data.type) {
        case 'list':        
            return {
                block: 'g-filter-param',
                mods: { 'list': true, 'state': data.state},
                title: data.title,
                more: data.more,
                content: data.values
            }
            break;
        case 'price':
            return {
                block: 'g-filter-param',
                title: data.title,
                min: data.min,
                max: data.max,
                scale: data.scale,
                ticks: data.ticks
            }
            break;
    }
}
