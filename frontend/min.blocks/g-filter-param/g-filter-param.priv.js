/**
 *  @param {Object} data
 *    @key {String} title
 *    @key {String} type
 *    @key {String} [view]
 *
 *  if view == list, default
 *    @key {Number} count
 *    @key {String} state, 'opened'|'closed', default='opened'
 *    @key {Array} values
 *      @of {Object} item
 *        @key {Number} id
 *        @key {String} name
 *
 *  if view == price
 *    @key {Integer} min
 *    @key {Integer} max
 *    @key {Integer} scale
 *    @key {Array} ticks
 *      @of {Integer} tick like 2100
 */
blocks['g-filter-param'] = function (data, env) {
    switch (data.view) {
        case 'price':
            return {
                block: 'g-filter-param',
                type: data.type,
                title: data.title,
                min: data.min,
                max: data.max,
                scale: data.scale,
                ticks: data.ticks
            }
            break;

        case 'list':
        default:
            assertHas(data, 'type', 'g-filter-param: Should point type');
            assertHas(data, 'title', 'g-filter-param: Should point title');
            assertHas(data, 'values', 'g-filter-param: Should point values for ' + data.type);

            return {
                block: 'g-filter-param',
                type: data.type,
                mods: { 'list': true, 'state': data.state || 'opened'},
                title: data.title,
                more: data.more, // TODO: delete more
                content: data.values
            }
            break;
    }
}
