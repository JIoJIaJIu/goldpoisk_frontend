/**
 * @param {String} title
 * @param {String} category
 * @param {Object} features
 * @param {Object} [item]
 *
 */
blocks['g-item'] = function (data, env) {
    var collumn = {
        block: 'g-right-col',
        content: [{
                block: 'g-item-features',
                content: data.features
            }, {
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
    }

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

    var item =  {
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
            collumn, {
                block: 'clear'
            }
        ]
    }

    return item
}
