/**
 *  @param {Array} data
 *    @of {Object} item
 *      @key {String} href
 *      @key {String} label
 *      @key {String} type
 *      @kye {Bool} [isActive]
 **/
blocks['g-menu'] = function (data, env) {
    return {
        block: 'g-menu',
        content: data.map(function (item) {
            return {
                block: 'g-menu-item',
                mods: { type: item.type, state: (item.isActive) ? 'active' : null },
                href: item.href,
                label: item.label
            }
        })
    }
}
