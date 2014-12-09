({
    block: 'page',
    title: 'items',
    head: [
        { elem: 'css', url: '_items.css' },
    ],
    scripts: [{ elem: 'js', url: '_items.js' }],
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
                }, {
                    elem: 'clear',
                }
            ] 
        }, {
            block: 'g-menu',
            content: [
                {
                    block: 'g-menu-item',
                    mods: { type: 'necklaces', state: 'active' },
                    label: 'КОЛЬЕ'
                }, {
                    block: 'g-menu-item',
                    mods: { type: 'chains' },
                    label: 'ЦЕПИ'
                }, {
                    block: 'g-menu-item',
                    mods: { type: 'pendants' },
                    label: 'ПОДВЕСКИ'
                }, {
                    block: 'g-menu-item',
                    mods: { type: 'bracelets' },
                    label: 'БРАСЛЕТЫ'
                }, {
                    block: 'g-menu-item',
                    mods: { type: 'rings' },
                    label: 'КОЛЬЦА'
                }, {
                    block: 'g-menu-item',
                    mods: { type: 'earrings' },
                    label: 'СЕРЬГИ'
                }, {
                    block: 'g-menu-item',
                    mods: { type: 'brooches' },
                    label: 'БРОШИ<br>И ЗАЖИМЫ'
                }, {
                    block: 'g-menu-item',
                    mods: { type: 'watches' },
                    label: 'ЧАСЫ'
                }, {
                    block: 'g-menu-item',
                    mods: { type: 'cutlery' },
                    label: 'СТОЛОВЫЕ<br>ПРИБОРЫ'
                }
            ]
        }, {
            block: 'g-content',
            content: [
                {
                    block: 'g-breadcrumbs',
                    root: {
                        title: 'Главная',
                        url: '/'
                    },
                    path: [
                        {
                            title: 'Кольца',
                            url: '/'
                        }, {
                            title: 'Обручальные',
                            url: '/'
                        }
                    ]
                }, {
                    block: 'g-category-title',
                    title: 'Кольца',
                    count: '11 253'
                }, {
                    block: 'g-goods',
                    content: [
                        {
                            block: 'g-product',
                            mods: { like: 'yes', action: 'yes' },
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
                            mods: { like: 'yes', action: 'yes' },
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
                            mods: { like: 'yes', action: 'yes' },
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
                            mods: { like: 'yes', action: 'yes' },
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
                }, 
            ]
        },
        {
            block: 'clear'
        },
        {
            block: 'g-footer',
            content: [

            ]
        }
    ]
})
