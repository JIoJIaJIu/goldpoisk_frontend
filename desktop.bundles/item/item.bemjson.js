({
    block: 'page',
    title: 'GoldPoisk',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: '' } },
        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        { elem: 'css', url: './item.css' }
    ],
    scripts: [{ elem: 'js', url: 'item.bemhtml.js' }, { elem: 'js', url: 'item.priv.js' }],
    mods: { theme: 'normal' },
    content: [
        { 
            block: 'g-header',
            content: [
                {
                    block: 'g-logo',
                    description: 'Крупнейший поиск ювелирных изделий'
                },/*
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
                },*/
                {
                    block: 'g-support',
                    content: [
                    ]
                },
                {
                    elem: 'clear',
                }
            ] 
        },
        {
            block: 'g-menu',
            content: [
                {
                    block: 'g-menu-item',
                    mods: { type: 'necklaces' },
                    label: 'Колье',
                    href: '#'
                },
                {
                    block: 'g-menu-item',
                    mods: { type: 'chains' },
                    label: 'ЦЕПИ'
                },
                {
                    block: 'g-menu-item',
                    mods: { type: 'pendants', state: 'active' },
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
                    label: 'КОЛЬЦА'
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
        },
        {
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
                        },
                        {
                            title: 'Красивые',
                            url: '/'
                        }
                    ]
                },
                {
                    block: 'g-item',
                    content: [
                        {
                            block: 'g-item-heading',
                            mods: { type: 'main' },
                            content: 'Обручальное кольцо из белого золота с 21 бриллиантом'
                        },
                        {
                            block: 'g-item-category',
                            title: 'Обручальные кольца'
                        },
                        {
                            block: 'g-item-gallery',
                            mods: { type: 'big' },
                            content: [
                                {
                                    elem: 'title',
                                    title: 'Фото',
                                    current: 2,
                                    count: 8
                                },
                                {
                                    elem: 'preview_images',
                                    images: ['../../desktop.blocks/g-item-gallery/images/preview01.jpg',
                                             '../../desktop.blocks/g-item-gallery/images/preview01.jpg',
                                             '../../desktop.blocks/g-item-gallery/images/preview01.jpg',
                                             '../../desktop.blocks/g-item-gallery/images/preview01.jpg',
                                             '../../desktop.blocks/g-item-gallery/images/preview01.jpg']
                                },
                                {
                                    elem: 'main_image',
                                    image: '../../desktop.blocks/g-item-gallery/images/main02.jpg'
                                }
                            ]
                        },
                        {
                            block: 'g-right-col',
                            content: [
                                {
                                    block: 'g-item-buy-in-shop',
                                    shop: 'Центрювелирторг',
                                    price: 6169
                                }, {
                                    block: 'g-item-features',
                                    content: [
                                        {
                                            'Артикул' : '51235654'
                                        },
                                        {
                                            'Металл' : 'Белое золото'
                                        },
                                        {
                                            'Проба' : '585'
                                        },
                                        {
                                            'Камень' : '21 бриллиант'
                                        },
                                        {
                                            'Карат' : '0,07'
                                        }
                                    ]
                                },
                                {
                                    block: 'g-item-description',
                                    content: 'Стильное и изящное обручальное кольцо с дорожкой из бриллиантов и основой из белого золота 585 пробы. В продаже есть модели из желтого и розового золота. Товар в наличии и под заказ.'
                                }, {
                                    block: 'g-like',
                                    mods: { type: 'extended' }
                                }, {
                                    block: 'g-social_follow',
                                    content: [
                                        {
                                            elem: 'item',
                                            mods: { type: 'vk' },
                                            tag: 'a',
                                            attrs: { href: 'https://vk.com/goldpoisk' },
                                            content: '2 528'
                                        }, {
                                            elem: 'item',
                                            mods: { type: 'fb' },
                                            tag: 'a',
                                            attrs: { href: 'https://www.facebook.com/pages/GoldPoisk/316157391908401' },
                                            content: '978'
                                        }, {
                                            elem: 'item',
                                            mods: { type: 'twitter' },
                                            tag: 'a',
                                            attrs: { href: 'https://twitter.com/GoldPoisk' },
                                            content: '641'
                                        }, {
                                            elem: 'item',
                                            mods: { type: 'ok' },
                                            tag: 'a',
                                            attrs: { href: 'http://ok.ru/group/53327077638372' },
                                            content: '578'
                                        }
                                    ]
                                }
                            ]
                        }, {
                            block: 'g-item-heading',
                            mods: { type: 'simple' },
                            content: 'Купить этот товар в магазинах'
                        }, {
                            block: 'g-available-in-stores',
                            content: [
                                {
                                    name: 'Линии любви',
                                    price: 6100
                                }, {
                                    name: 'Линии любви',
                                    price: 6100
                                }, {
                                    name: 'Линии любви',
                                    price: 6100
                                }, {
                                    name: 'Линии любви',
                                    price: 6100
                                }
                            ]
                        }
                    ]
                }
            ]
        }, {
            block: 'g-footer',
            content: [
            ]
        }
    ]     
})
