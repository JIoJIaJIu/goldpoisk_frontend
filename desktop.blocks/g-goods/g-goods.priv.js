/**
 * @params {Object} data
 *  @key {Array} list
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
        content: list,
    }

    if (data.sortParams) {
        block.mods = { 'sorting': true };
        block.sortParams = data.sortParams;
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
