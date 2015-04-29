/**
 *  @param {Object} data
 *      @key {Array} products
 *      @key {String} url
 *      @key {Integer} count
 **/
blocks['g-bids'] = function (data, env) {
    var MIN_DIFF = 5;
    var diff = data.count - data.products.length;
    return {
        block: 'g-bids',
        content: [
            {
                block: 'g-heading',
                mods: { size: 'm', dark: true },
                content: 'Лучшие предложения от наших партнёров'
            },
            blocks['g-goods']({
                list: data.products
            }),
            diff != 0 ? {
                block: 'g-link',
                mods: { 'more': true },
                url: '#',
                content: diff < MIN_DIFF ? 'Все предложения' : 'Ещё ' + declension(data.count, 'предложение')
            } : null
        ]
    }
}