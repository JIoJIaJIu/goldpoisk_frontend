/**
 *  @param {Object} data
 *      @key {Array} products
 *      @key {String} url
 *      @key {Integer} count
 *      @key {Boolean} [error404] предложения на случай если товар не найден
 **/
blocks['g-bids'] = function (data, env) {
    var MIN_DIFF = 5;
    var diff = data.count - data.products.length;
    var goods = blocks['g-goods']({
        list: data.products
    });
    var link = diff != 0 ? {
        block: 'g-link',
        mods: { 'more': true },
        url: data.url,
        content: diff < MIN_DIFF ? 'Все предложения' : 'Ещё ' + declension(data.count, 'предложение')
    } : null;

    if (env && env.error404)
        return {
            block: 'g-bids',
            content: [{
                    block: 'g-heading',
                    mods: { size: 'm', dark: true },
                    content: 'Данный товар на сегодняшний момент отсутствует у партнеров, возможно, он появится позже.'
                }, {
                    elem: 'description',
                    tag: 'p',
                    content: 'Но для вас найдётся ещё много интересного в нашем каталоге, например'
                },
                goods,
                link
            ]
        }

    return {
        block: 'g-bids',
        content: [{
                block: 'g-heading',
                mods: { size: 'm', dark: true },
                content: 'Лучшие предложения от наших партнёров'
            },
            goods,
            link
        ]
    }
}