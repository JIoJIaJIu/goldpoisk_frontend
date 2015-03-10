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

    if (data.sortParams)
        block.mods = { 'sorting': true }
        block.sortParams = data.sortParams

    return block
}

//TODO;
blocks['g-goods.str'] = function (data, env) {
    list = JSON.parse(data)
    for (var i = 0, length = list.length; i < length; i++) {
        var item = list[i];
        list.push(blocks['g-product'](item, env));
    }

    return list
}
