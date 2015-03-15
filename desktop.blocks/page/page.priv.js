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
                block: 'g-content',
                content: [{
                        block: 'g-section',
                        mods: { type: 'slogan' },
                        title: 'Goldpoisk - самый большой каталог ювелирных изделий',
                        description: 'Все ювелирные изделия от лучших производителей собраны здесь.<br>Огромный выбор из 150000 товаров.'
                    }, {
                        block: 'g-section',
                        mods: { type: 'subscription' },
                        title: 'Лучшие предложения от наших партнёров',
                        description: 'Хотите первыми узнавать об акциях и получать самые выгодне предложения?<br>Подпишитесь на нашу рассылку. Никакой лишней информации,<br>только самые свежие и лучшие предложения от наших партнёров!',
                    },

                    blocks['g-goods']({
                        list: data.products
                    })
                ]
            }, {
                block: 'g-cooperation',
                content: []
            }
        ]
    })
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

        content: {
            block: 'g-content',
            content: [
                {
                    block: 'g-category-title',
                    title: data.category,
                    count: data.count
                },

                blocks['g-goods']({
                    list: JSON.parse(data.products),
                    sortParams: data.sortParams
                }, {js: true}),

                blocks['g-paginator'](data.paginator)
            ]
        }
    }, env);
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
