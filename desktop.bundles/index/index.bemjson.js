({
    block: 'page',
    title: 'GoldPoisk',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: '' } },
        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        { elem: 'css', url: 'index.css' }
    ],
    scripts: [{ elem: 'js', url: '_index.js' }],
    mods: { theme: 'normal' },
    content: [
        {
            block: 'g-header',
            content: [
                {
                    block: 'g-logo',
                    description: 'Крупнейший поиск ювелирных изделий'
                }/*,
                {
                    block: 'g-basket',
                    amount: 0
                }/*,
                {
                    elem: 'desire',
                    content: [
                        {
                            tag: 'img',
                            attrs: {src: '../../desktop.blocks/g-header/heart.png'},
                        },
                        {
                            tag: 'span',
                            content: 'Нет товаров в списке желаний'
                        }
                    ] 
                }*/,
                {
                    block: 'g-support',
                    content: [
                    ]
                }
            ] 
        },
        {
            block: 'g-menu',
            js: true,
            content: [
                {
                    block: 'g-menu-item',
                    mods: { type: 'necklaces', state: 'active' },
                    label: 'КОЛЬЕ'
                },
                {
                    block: 'g-menu-item',
                    mods: { type: 'chains' },
                    label: 'ЦЕПИ'
                },
                {
                    block: 'g-menu-item',
                    mods: { type: 'pendants' },
                    label: 'ПОДВЕСКИ'
                },
                {
                    block: 'g-menu-item',
                    mods: { type: 'bracelets' },
                    label: 'БРАСЛЕТЫ'
                },
                {
                    block: 'g-menu-item',
                    mods: { type: 'rings' },
                    label: 'КОЛЬЦА',
                    url: '/rings'
                },
                {
                    block: 'g-menu-item',
                    mods: { type: 'earrings' },
                    label: 'СЕРЬГИ'
                },
                {
                    block: 'g-menu-item',
                    mods: { type: 'brooches' },
                    label: 'БРОШИ<br>И ЗАЖИМЫ'
                },
                {
                    block: 'g-menu-item',
                    mods: { type: 'watches' },
                    label: 'ЧАСЫ'
                },
                {
                    block: 'g-menu-item',
                    mods: { type: 'cutlery' },
                    label: 'СТОЛОВЫЕ<br>ПРИБОРЫ'
                }
            ]
        },{
            block: 'g-promotion',
            items: [{
                elem: 'item',
                content: [{
                    block: 'image',
                    tag: 'img',
                    attrs: {
                        src: '/media/promotion/promotion01.png',
                        alt: 'Promo1'
                    }
                }, {
                    block: 'g-promotion-item',
                    coord: [0, 0],
                    content: [{
                        elem: 'title',
                        title: 'Серьги'
                    }, {
                        elem: 'price',
                        price: '6000'
                    }]
                }]
            }],
            content: [{
                block: 'g-promotion-markers-list',
                content: [
                    {
                        block: 'g-promotion-marker',
                        mods: { state: 'selected' }
                    },
                    {
                        block: 'g-promotion-marker'
                    },
                    {
                        block: 'g-promotion-marker'
                    }
                ]
            }]
        },
        {
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
        },
        {
            block: 'g-content',
            content: [
                {
                    block: 'g-section',
                    title: 'Goldpoisk - самый большой каталог ювелирных изделий',
                    description: 'Все ювелирные изделия от лучших производителей собраны здесь.<br>Огромный выбор из 150000 товаров.'
                }, {
                    block: 'g-bids',
                    content: [
                        {
                            block: 'g-heading',
                            mods: { size: 'm', dark: true },
                            content: 'Лучшие предложения от наших партнёров'
                        },/* {
                            block: 'g-subscribe',
                            content: 'Хотите первыми узнавать об акциях и получать самые выгодне предложения?<br>Подпишитесь на нашу рассылку. Никакой лишней информации,<br>только самые свежие и лучшие предложения от наших партнёров!'
                        }, */{
                            block: 'g-goods',
                            content: [
                                {
                                    block: 'g-product',
                                    mods: { action: true },
                                    url: '#',
                                    title: 'Золотое Кольцо с гранатами и фианитами. Очень красивое и неебически дорогое',
                                    imageUrl: '../../desktop.blocks/g-goods/images/good.png',
                                    weight: '4.5 грамм',
                                    carat: '0,07 карат',
                                    price: 1000000,
                                    store: 'Sunlight',
                                    storeUrl: '#'
                                }, {
                                    block: 'g-product',
                                    mods: { hit: true },
                                    like: true,
                                    url: '#',
                                    title: 'Золотое Кольцо с гранатами и фианитами. Очень красивое и неебически дорогое',
                                    imageUrl: '../../desktop.blocks/g-goods/images/good.png',
                                    weight: '4.5 грамм',
                                    carat: '0,07 карат',
                                    price: 1000000,
                                    store: 'Sunlight',
                                    storeUrl: '#'
                                }, {
                                    block: 'g-product',
                                    url: '#',
                                    title: 'Золотое Кольцо с гранатами и фианитами. Очень красивое и неебически дорогое',
                                    imageUrl: '../../desktop.blocks/g-goods/images/good.png',
                                    weight: '4.5 грамм',
                                    carat: '0,07 карат',
                                    price: 1000000,
                                    store: 'Sunlight',
                                    storeUrl: '#'
                                }, {
                                    block: 'g-product',
                                    mods: { action: true },
                                    like: true,
                                    url: '#',
                                    title: 'Золотое Кольцо с гранатами и фианитами. Очень красивое и неебически дорогое',
                                    imageUrl: '../../desktop.blocks/g-goods/images/good.png',
                                    weight: '4.5 грамм',
                                    carat: '0,07 карат',
                                    price: 1000000,
                                    store: 'Sunlight',
                                    storeUrl: '#'
                                }
                            ]
                        }, {
                            block: 'g-link',
                            mods: { 'more': true },
                            url: '#',
                            content: 'Ещё 18 предложений'
                        }
                    ]
                }
            ]
        }, {
            block: 'g-cooperation',
            content: [  

                ]
        }, {
            block: 'g-footer',
            content: [

            ]
        }
    ]
})
