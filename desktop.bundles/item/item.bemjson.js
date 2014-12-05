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
                },
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
                },
                {
                    block: 'g-support',
                    content: [
                    ]
                },
                {
                    elem: 'clear',
                }*/
            ] 
        },
        {
            block: 'g-menu',
            content: [
                {
                    block: 'g-menu-item',
                    mods: { type: 'necklaces' },
                    label: 'Колье'
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
                    block: 'g-item-heading',
                    mods: { type: 'main' },
                    content: 'Обручальное кольцо из белого золота с 21 бриллиантом'
                },
                {
                    block: 'g-item-category',
                    title: 'Обручальные кольца'
                },
                {
                    block: 'g-item-galery',
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
                            images: ['../../desktop.blocks/g-item-galery/images/preview01.jpg',
                                     '../../desktop.blocks/g-item-galery/images/preview01.jpg',
                                     '../../desktop.blocks/g-item-galery/images/preview01.jpg',
                                     '../../desktop.blocks/g-item-galery/images/preview01.jpg',
                                     '../../desktop.blocks/g-item-galery/images/preview01.jpg']
                        },
                        {
                            elem: 'main_image',
                            image: '../../desktop.blocks/g-item-galery/images/main02.jpg'
                        }
                    ]
                },
                {
                    block: 'g-right-side',
                    content: [
                        {
                            block: 'g-item-description',
                            pars: [
                                ['Артикул', '51235654'],
                                ['Металл', 'Белое золото'],
                                ['Проба', '585'],
                                ['Камень', '21 бриллиант'],
                                ['Карат', '0,07']
                            ]
                        },
                        {
                            block: 'g-item-write-up',
                            content: 'Стильное и изящное обручальное кольцо с дорожкой из бриллиантов и основой из белого золота 585 пробы. В продаже есть модели из желтого и розового золота. Товар в наличии и под заказ.'
                        },
                        {
                            block: 'g-like',
                            mods: { type: 'extended' }
                        },
                        {
                            block: 'g-social_follow',
                            content: [
                                {
                                    elem: 'item',
                                    mods: { type: 'vk' },
                                    tag: 'p',
                                    content: '2 528'
                                },
                                {
                                    elem: 'item',
                                    mods: { type: 'fb' },
                                    content: '978'
                                },
                                {
                                    elem: 'item',
                                    mods: { type: 'twitter' },
                                    content: '641'
                                },
                                {
                                    elem: 'item',
                                    mods: { type: 'ok' },
                                    content: '578'
                                },
                                {
                                    elem: 'item',
                                    mods: { type: 'mail' },
                                    content: '654'
                                },
                                {
                                    elem: 'item',
                                    mods: { type: 'gplus' },
                                    content: ''
                                }
                            ]
                        }
                    ]
                },
                {
                    block: 'g-item-heading',
                    mods: { type: 'simple' },
                    content: 'Купить этот товар в магазинах'
                },
                {
                    block: 'g-available-in-stores',
                    stores: [
                        {
                            name: 'Линии любви',
                            price: '6 100'
                        },
                        {
                            name: 'Линии любви',
                            price: '6 100'
                        },
                        {
                            name: 'Линии любви',
                            price: '6 100'
                        },
                        {
                            name: 'Линии любви',
                            price: '6 100'
                        },
                        {
                            name: 'Линии любви',
                            price: '6 100'
                        },
                    ]
                },
                {
                    block: 'g-item-heading',
                    mods: { type: 'simple' },
                    content: 'Ещё 10 похожих товаров'
                },
                {
                    block: 'g-goods',
                    content: [
                        {
                            block: 'g-product',
                            mods: { action: 'yes' },
                            title: 'Кольцо с 21 бриллиантом',
                            image: '../../desktop.blocks/g-goods/images/good.png',
                            pw: '4,5 грамм',
                            jw: '0,07 карат',
                            price: '3333Р',
                            shop: 'Sunlight',
                            href: '/'
                        },
                        {
                            block: 'g-product',
                            mods: { hit: 'yes' }
                        },
                        {
                            block: 'g-product',
                            mods: { like: 'yes' }
                        },
                        {
                            block: 'g-product',
                            mods: {like: 'yes', action: 'yes' }
                        }
                    ]
                }
            ]
        },
        {
            block: 'g-footer',
            content: [

            ]
        }
    ]     
})
