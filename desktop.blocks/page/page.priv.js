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
        mods: { theme: 'normal' },

        content: [
            blocks['g-header'](),
            blocks['g-menu'](data.menu, env),

            {
                block: 'g-content',
                content: data.content
            }, {
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
                content: {
                    block: 'fotorama',
                    src: data.promo[0]
                }
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
            }, {
                block: 'g-section',
                mods: { type: 'subscription' },
                title: 'Лучшие предложения от наших партнёров',
                description: 'Хотите первыми узнавать об акциях и получать самые выгодне предложения?<br>Подпишитесь на нашу рассылку. Никакой лишней информации,<br>только самые свежие и лучшие предложения от наших партнёров!&#8381;',
            },

            blocks['g-goods']({
                list: data.products
            })
        ]
    })
}
/**
 * data.menu
 * data.products
 */

pages['category'] = function (data, env) {
    return blocks['page']({
        menu: data.menu,

        content: [
            {
                block: 'g-category-title',
                title: data.category,
                count: data.count
            }, 

            blocks['g-goods']({
                list: data.products
            })
        ]
    }, env)
}

/**
 * data.menu
 * data.item
 */
pages['item'] = function (data, env) {
    return blocks['page']({
        menu: data.menu,
        content: [
            {
                block: 'g-item',
                content: [
                    blocks['g-item'](data.item, env)
                ]
            }
        ]
    }, env)
}
