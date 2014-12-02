blocks['g-goods'] = function (data, env) {
    var list = [];
    for (var i = 0, length = data.list.length; i < length; i++) {
        var item = data.list[i];
        list.push(blocks['g-product'](item));
    }
    return list;
}
