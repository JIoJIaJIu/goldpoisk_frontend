/**
 *  @param {Object} data
 *    @key {String} title
 *    @key {String} number
 *    @key {String} weight
 *    @key {String} [description]
 *    @key {Array} images
 *      @of {String} url
 *    @key {Array} items
 *      @of {Object} item
 *        @key {Number} price
 *        @key {String} buyUrl
 *        @key {String} storeName
 *        @key {String} storeUrl
 *
 */
blocks['g-item'] = function (data, env) {
    assertHas(data, 'title', 'Should point title');
    assertHas(data, 'number', 'Should point number');
    assertHas(data, 'images', 'Should point images');
    assertHas(data, 'weight', 'Should point weight');
    assertHas(data, 'items', 'Should point items');

    /*

    if (data.item) {
        console.log(data.item);
        collumn.content.unshift({
            block: 'g-item-buy-in-shop',
            shop: data.item.store,
            shopUrl: data.item.storeUrl,
            price: data.item.price,
            buyUrl: data.item.buyUrl
        });
    }
    */

    return {
        block: 'g-item',
        content: [{
            block: 'g-item-heading',
            mods: { type: 'main' },
            content: data.title
        }, {
            block: 'g-item-category',
            title: data.category
        },
        blocks['g-item-gallery']({ images: data.images }, env),
        collumn(),{
            block: 'clear'
        }]
    }

    function collumn() {
        return {}
        return {
            block: 'g-right-col',
            content: [{
                    block: 'g-item-description',
                    content: data.description
                }, {
                    block : 'yashare',
                    quickServices : data.quickServices || [
                        'vkontakte',
                        'facebook',
                        'twitter',
                        'odnoklassniki'
                    ],
                    theme : data.theme || 'counter',
                    l10n : data.l10n || 'ru',
                    url : data.url,
                    title : data.likesTitle,
                    description : data.likesDescription,
                    image : 'https://raw.githubusercontent.com/voischev/bem-social/' +
                            'master/desktop.bundles/index/blocks/page/image/bem.png'
                }
            ]
        };
    }
}

blocks['g-item.str'] = function (data, env) {
    return blocks['g-item'](JSON.parse(data));
}
