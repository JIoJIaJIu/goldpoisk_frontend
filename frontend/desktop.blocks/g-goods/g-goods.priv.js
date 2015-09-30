/**
 * @params {Object} data
 *  @key {Array} list
 *  @key {Number} count
 *  @key {Array} sortParams
 **/
blocks['g-goods'] = function (data, env) {
    var list = [];
    for (var i = 0, length = data.list.length; i < length; i++) {
        var item = data.list[i];
        list.push(blocks['g-product'](item, env));
    }

    var block = {
        block: 'g-goods',
        js: {
            count: data.count,
            products: data.list
        },
        content: list
    }

    if (data.sortParams) {
        block.mods = { 'sorting': true };
        block.sortParams = data.sortParams;
    }

    if (data.filters) {
        block.filters = blocks['g-filter'](data.filters, env);
    }

    return block;
}

blocks['g-goods.items'] = function (data, env) {
    var list = [];
    for (var i = 0, length = data.length; i < length; i++) {
        var item = data[i];
        list.push(blocks['g-product'](item, env));
    }

    return list
}
