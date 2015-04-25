/**
 *  @param {Object} data
 *    @key {String} title - Название товара
 *    @key {String} number - Артикул товара
 *    @key {String} weight - Вес товара
 *    @key {String} url - Ссылка на расширенную страницу товара
 *    @key {String} [description] - Описание товара
 *    @key {Array} images
 *      @of {String} url
 *    @key {Array} [gems]
 *      @of {Object} gem
 *        @key {String} name - Название камня входящего в состав товара
 *        @key {String} carat - Караты камня
 *    @key {Array} items
 *      @of {Object} item
 *        @key {Number} price - Цена в магазине
 *        @key {String} buyUrl - Ссылка для покупки
 *        @key {String} storeName - Название магазина
 *        @key {String} storeUrl - Ссылка на магазин
 *     @key {Object} [yashare]
 *       @key {String} likesTitle
 *       @key {String} description
 *       @key {Array} [quickServices] by default ['vkontakte', 'facebook', 'twitter', 'odnoklassniki']
 *         @of {String} service
 *       @key {String} [theme] by default 'counter'
 *       @key {String} [l10n] by default 'ru'
 *  @param {Object} env
 *    @key {Boolean} [titleLink], кликабельный ли загаловок
 */
blocks['g-item'] = function (data, env) {
    assertHas(data, 'title', 'Should point title');
    assertHas(data, 'number', 'Should point number');
    assertHas(data, 'images', 'Should point images');
    assertHas(data, 'weight', 'Should point weight');
    assertHas(data, 'items', 'Should point items');

    env = env || {};
    if (!data.yashare) {
        data.yashare = {};
    }

    var heading = {
        block: 'g-heading',
        content: data.title
    }

    var category = {
        block: 'g-item-category',
        title: data.category
    }

    if (env.independent) {
        heading.mods = { size: 'l' };
    }

//<<<<<<< HEAD
    var params = {};
    if (env.titleLink) {
        params = { url: data.url };
/*=======
    var params = {
        id: data.id
    };
    if (data.url) {
        params.url = data.url;
>>>>>>> edb1e04b26f7d09752b962ca41aa70089286ed65*/
        heading["url"] = data.url;
    }
    
    var block = {
        block: 'g-item',
        js: params,
        content: [
            heading,
            data.category ? category : null,
            blocks['g-item-gallery']({ images: data.images }, env),
            collumn()
        ]
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

        var more = {
            block: 'g-button',
            mods: { type: 'gray' },
            href: data.url,
            content: 'Подробнее'
        };

        var description = {
            block: 'g-item-description',
            content: data.description
        };

        return {
            block: 'g-right-col',
            content: [{
                block: 'g-item-buy-in-shop',
                store: item.storeName,
                url: item.storeUrl,
                buyUrl: item.buyUrl,
                price: item.price
            },
            {
                block: 'g-item-features',
                content: features
            },
            !env.big ? more : null,
            env.big ? description : null,
            {
                block: 'g-like',
                mods: { type: 'extended' }
            }, {
                block: 'yashare',
                quickServices : data.yashare.quickServices || [
                    'vkontakte',
                    'facebook',
                    'twitter',
                    'odnoklassniki'
                ],
                theme: data.yashare.theme || 'counter',
                l10n: data.yashare.l10n || 'ru',
                url: data.url,
                title: data.yashare.likesTitle,
                description: data.yashare.likesDescription,
                image: 'https://raw.githubusercontent.com/voischev/bem-social/' +
                       'master/desktop.bundles/index/blocks/page/image/bem.png'
            }]
        };
    }
}

blocks['g-item.str'] = function (data, env) {
    return blocks['g-item'](JSON.parse(data), env);
}
