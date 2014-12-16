/** 
 * @param {String} title
 * @param {String} category
 * @param {Object} features
 *
 */
blocks['g-item'] = function (data, env) {
    return {
        block: 'g-item',
        content: [
            {
                block: 'g-item-heading',
                mods: { type: 'main' },
                content: data.title
            }, {
                block: 'g-item-category',
                title: data.category
            },

            blocks['g-item-gallery'](data.gallery, env),

            {
                block: 'g-right-col',
                content: [
                    {
                        block: 'g-item-buy-in-shop',
                        shop: data.shop,
                        shopUrl: data.buyUrl,
                        price: data.price,
                        buyUrl: data.buyUrl
                    }, {
                        block: 'g-item-features',
                        content: data.features
                    }, {
                        block: 'g-item-description',
                        content: data.description
                    }
                ]
            }, {
                block: 'clear'
            }
        ]
    }
}
