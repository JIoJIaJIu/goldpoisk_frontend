var blocks = {};
var pages = {};
blocks['page'] = function (data, env) {
    return {
        block: 'page',
        title: 'GoldPoisk',
        favicon: '/media/favicon.ico',
        head: [
            { elem: 'meta', attrs: { name: 'description', content: '' } },
            { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
            { elem: 'css', url:  'css/index.css' }
        ],
        scripts: [
            { elem: 'js', url: 'http://yastatic.net/jquery/2.1.3/jquery.min.js' },
            { elem: 'js', url: 'http://goldpoisk.ru/js/third-parties/jssor.slider.min.js' },
            { elem: 'js', url: 'http://goldpoisk.ru/js/third-parties/lodash.min.js' },
            { elem: 'js', url: 'js/index.bemhtml.js' },
            { elem: 'js', url: 'js/index.priv.js' },
            { elem: 'js', url: 'js/index.js' }
        ],
        mods: { theme: 'normal' },

        content: [
            blocks['g-header'](null, env),
            blocks['g-menu'](data.menu, env),
            data.content,

            {
                block: 'g-footer',
                content: []
            }
        ]
    }
}

pages['index'] = function (data, env) {
    return blocks['page']({
        menu: data.menu,
        content: [
            {
                block: 'g-content',
                content: [
                    {
                        block: 'g-promotion',
                        js: 'true',
                        images: data.promo
                    }, {
                        block: 'g-pride',
                        content: [
                            {
                                block: 'g-pride-item',
                                mods: { type: 'brown' },
                                label: 'Лучшие производители ювелирных изделий'
                            },
                            {
                                block: 'g-pride-item',
                                mods: { type: 'beige' },
                                label: 'Огромный ассортимент представлен в каталоге'
                            },
                            {
                                block: 'g-pride-item',
                                mods: { type: 'gold' },
                                label: 'Только проверенные партнёры и предложения'
                            },
                            {
                                block: 'g-pride-item',
                                mods: { type: 'gray' },
                                label: 'Простой и удобный поиск по параметрам'
                            }
                        ]
                    }, {
                        block: 'g-section',
                        mods: { type: 'slogan' },
                        title: 'Goldpoisk - самый большой каталог ювелирных изделий',
                        description: 'Все ювелирные изделия от лучших производителей собраны здесь.<br>Огромный выбор из 150000 товаров.'
                    },
                    blocks['g-bids']({
                        count: data.count || 0, //TODO:
                        products: data.products,
                        url: '#'
                    }),
                    {
                        block: 'g-cooperation',
                        content: []
                    }
                ]
            }
        ]
    })
}

pages['index.content'] = function (data, env) {
    return {
        block: 'g-content',
        content: [
            {
                block: 'g-promotion',
                js: 'true',
                images: data.promo
            }, {
                block: 'g-pride',
                content: [
                    {
                        block: 'g-pride-item',
                        mods: { type: 'brown' },
                        label: 'Лучшие производители ювелирных изделий'
                    },
                    {
                        block: 'g-pride-item',
                        mods: { type: 'beige' },
                        label: 'Огромный ассортимент представлен в каталоге'
                    },
                    {
                        block: 'g-pride-item',
                        mods: { type: 'gold' },
                        label: 'Только проверенные партнёры и предложения'
                    },
                    {
                        block: 'g-pride-item',
                        mods: { type: 'gray' },
                        label: 'Простой и удобный поиск по параметрам'
                    }
                ]
            }, {
                block: 'g-section',
                mods: { type: 'slogan' },
                title: 'Goldpoisk - самый большой каталог ювелирных изделий',
                description: 'Все ювелирные изделия от лучших производителей собраны здесь.<br>Огромный выбор из 150000 товаров.'
            },
            blocks['g-bids']({
                count: data.count || 0, //TODO:
                products: data.products,
                url: '#'
            }),
            {
                block: 'g-cooperation',
                content: []
            }
        ]
    }
}

/**
 * data.menu
 * {String} !data.products
 */

pages['category'] = function (data, env) {
    env = env || {};
    env.headerJs = true;

    return blocks['page']({
        menu: data.menu,
        content: pages['category.content'](data, env)
    }, env);
}

pages['category.content'] = function (data, env) {
    return {
        block: 'g-content',
        content: [
            {
                block: 'g-category-title',
                title: data.category,
                count: data.count
            },
            blocks['g-goods']({
                list: data.products,
                sortParams: data.sortParams
            }, {js: true}),
            blocks['g-paginator'](data.paginator)
        ]
    }
}

/**
 * data.menu
 * data.item
 */
pages['item'] = function (data, env) {
    return blocks['page']({
        menu: data.menu,
        content: {
            block: 'g-content',
            content: [
                {
                    block: 'g-item',
                    content: [
                        blocks['g-item'](data.item, env)
                    ]
                }
            ]
        }
    }, env)
}

function assertHas (obj, key, message) {
    if (!obj[key])
        throw new Error(message);
}
