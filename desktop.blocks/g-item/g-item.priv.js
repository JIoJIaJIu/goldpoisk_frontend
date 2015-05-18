/**
 *  @param {Object} data
 *    @key {Number} id
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
    assertHas(data, 'id', 'Should point id');
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

    var params = {
        id: data.id
    }

    if (env.titleLink) {
        params.url = data.url;
        heading["url"] = data.url;
    }

    if (data.items.length == 1) {
        var item = data.items[0];
        var store = {
            block: 'g-item-buy-in-shop',
            store: item.storeName,
            url: item.storeUrl,
            buyUrl: item.buyUrl,
            price: item.price
        }
    }

    if (data.items.length > 1) {
        var inStores = _.map(data.items, function (item) {
            return {
                name: item.storeName,
                url: item.storeUrl,
                buyUrl: item.buyUrl,
                price: item.price
            }
        });
        var stores = {
            block: 'g-available-in-stores',
            theme: {
                color: 'dark'
            },
            content: inStores
        };
    } else {
        var subscribe = {
            block: 'g-subscribe',
            content: 'К сожалению данный товар сейчас отсутсвует у нашего партнёра.'//'Товара нет в наличии. Подпишитесь на новости о появлении.'
        }
    }
    
    var block = {
        block: 'g-item',
        js: params,
        mods: { missing: !data.items.length },
        content: [
            heading,
            data.category ? category : null,
            blocks['g-item-gallery']({
                images: data.images,
                alt: data.title
            }, env),
            collumn(store, subscribe),
            stores
        ]
    };

    return block;

    function collumn(store, subscribe) {
        /**
         *  @param {Object} store || null
         *      @key {String} block
         *      @key {String} store
         *      @key {String} url
         *      @key {String} buyUrl
         *      @key {Number} price
         **/
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
            content: [
                store || subscribe,
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
