/**
 *  @param {Object} data
 *    @key {String} title
 *    @key {String} number
 *    @key {String} weight
 *    @key {String} [description]
 *    @key {Array} images
 *      @of {String} url
 *    @key {Array} [gems]
 *      @of {Object} gem
 *        @key {String} name
 *        @key {String} carat
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

    var block = {
        block: 'g-item',
        content: [{
            block: 'g-heading',
            content: data.title
        }, {
            block: 'g-item-category',
            title: data.category
        },
        blocks['g-item-gallery']({ images: data.images }, env),
        collumn(), {
            block: 'clear'
        }]
    };

    return block;

    function collumn() {
        //TODO:
        var item = data.items[0];
        //TODO: !sic
        if (data.description === 'Отстуствует') {
            data.description = null;
        }

        var features = {
            'Артикул': data.number,
        }

        if (data.weight) {
            features['Вес'] = data.weight;
        }

        if (data.gems && data.gems.length) {
            //TODO: move to lodash
            var gems = []
            var carats = []
            for (var i = 0, length = data.gems.length; i < length; i++) {
                var gem = data.gems[i];

                if (!(gem.name in gems))
                    gems.push(gem.name);

                carats.push(gem.carat);
            }
            features['Камень'] = gems.join(', ');
            features['Карат'] = carats.join(', ');
        }

        if (data.materials && data.materials.length) {
            var materials = []
            for (var i = 0, length = data.materials.length; i < length; i++) {
                var m = data.materials[i];
                if (!(m in materials))
                    materials.push(m);
            }
            features['Металл'] = materials.join(', ');
        }

        return {
            block: 'g-right-col',
            content: [{
                block: 'g-item-description',
                content: data.description
            }, {
                block: 'g-item-buy-in-shop',
                store: item.storeName,
                url: item.storeUrl,
                buyUrl: item.buyUrl,
                price: item.price
            }, {
                block: 'g-item-features',
                content: features
            }, {
                block : 'yashare',
                quickServices : data.quickServices || [
                    'vkontakte',
                    'facebook',
                    'twitter',
                    'odnoklassniki'
                ],
                theme : 'counter',
                l10n : 'ru',
                url : data.url,
                title : data.likesTitle,
                description : data.likesDescription,
                image : 'https://raw.githubusercontent.com/voischev/bem-social/' +
                        'master/desktop.bundles/index/blocks/page/image/bem.png'
            }]
        };
    }
}

blocks['g-item.str'] = function (data, env) {
    return blocks['g-item'](JSON.parse(data), env);
}
