({
    block: 'page',
    title: 'GoldPoisk',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: '' } },
        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        { elem: 'css', url: 'store.css' }
    ],
    scripts: [{ elem: 'js', url: '_store.js' }],
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
                            title: 'Партнёры',
                            url: '/'
                        }
                    ]
                }, {
                    block: 'g-store',
                    content: [
                        {
                            elem: 'catalog-marker',
                            content: [
                                {
                                    block: 'g-logo',
                                    mods: { store: true, 'store-name': 'sunlight' }
                                }, {
                                    block: 'g-heading',
                                    mods: { dark: true },
                                    content: 'Все товары магазина'
                                }, {
                                    block: 'g-button',
                                    mods: { close: true }
                                }
                            ]
                        }, {
                            elem: 'header',
                            content: [
                                {
                                    block: 'g-logo',
                                    mods: { store: true, 'store-name': 'sunlight' }
                                }, {
                                    block: 'g-heading',
                                    mods: { type: 'main' },
                                    content: 'Сеть магазинов ювелирных изделий Sunlight'
                                }
                            ]
                        }, {
                            block: 'g-store-info',
                            content: {
                                website: 'love-sl.ru',
                                url: '/',
                                address: {
                                    city: 'Москва',
                                    street: 'Калужское ш. 21 км',
                                    center: 'ТЦ МЕГА Теплый Стан',
                                    underground: 'м. Ясенево',
                                    url: '/'
                                },
                                phone: '+7 945 415-12-50',
                                openingHours: {
                                    from: '9:00',
                                    to: '20:00',
                                    workdays: 'ПН–ПТ',
                                    holidays: 'СБ-ВС'
                                }
                            }
                        }, {
                            elem: 'description',
                            content: 'Мы всегда рады рассказать о SUNLIGHT! Наша Горячая линия работает каждый день без выходных с 8 до 22. Это абсолютно бесплатно для Вас! Задавайте свои вопросы обо всём остальном уже позаботились мы.<br/>Наши консультанты помогут:<br/><br/>- узнать о наличии украшения (пожалуйста, сообщите его артикул)<br/>- найти ближайший к Вам магазин<br/>- проверить баланс карты Клуба SUNLIGHT<br/>- уточнить подробности об акциях и спецпредложениях'
                        }, {
                            elem: 'map',
                            content: [
                                {
                                    block: 'g-heading',
                                    mods: { size: 'm' },
                                    content: 'Магазин на карте'
                                }, {
                                    tag: 'div',
                                    attrs: { id: 'map' }
                                }
                            ]
                        }, {
                            elem: 'branch',
                            content: [
                                {
                                    block: 'g-heading',
                                    mods: { size: 'm' },
                                    content: 'Филиалы Sunlight'
                                }, {
                                    tag: 'div'
                                }
                            ]
                        }, {
                            block: 'g-bids',
                            content: [
                                {
                                    block: 'g-heading',
                                    mods: { size: 'm' },
                                    content: 'Лучшие предложения от магазина Sunlight',
                                }, {
                                    block: 'g-goods',
                                    content: [
                                        {
                                            block: 'g-product',
                                            mods: { like: true, action: true },
                                            url: '#',
                                            title: 'Золотое Кольцо с гранатами и фианитами. Очень красивое и неебически дорогое',
                                            imageUrl: '../../desktop.blocks/g-goods/images/good.png',
                                            weight: '4.5 грамм',
                                            carat: '0,07 карат',
                                            price: 1000000,
                                            store: 'Sunlight',
                                            storeUrl: '#',
                                            buyUrl: '#'
                                        }, {
                                            block: 'g-product',
                                            mods: { like: true, hit: true },
                                            url: '#',
                                            title: 'Золотое Кольцо с гранатами и фианитами. Очень красивое и неебически дорогое',
                                            imageUrl: '../../desktop.blocks/g-goods/images/good.png',
                                            weight: '4.5 грамм',
                                            carat: '0,07 карат',
                                            price: 1000000,
                                            store: 'Sunlight',
                                            storeUrl: '#',
                                            buyUrl: '#'
                                        }, {
                                            block: 'g-product',
                                            url: '#',
                                            title: 'Золотое Кольцо с гранатами и фианитами. Очень красивое и неебически дорогое',
                                            imageUrl: '../../desktop.blocks/g-goods/images/good.png',
                                            weight: '4.5 грамм',
                                            carat: '0,07 карат',
                                            price: 1000000,
                                            store: 'Sunlight',
                                            storeUrl: '#',
                                            buyUrl: '#'
                                        }, {
                                            block: 'g-product',
                                            mods: { like: false, action: true },
                                            url: '#',
                                            title: 'Золотое Кольцо с гранатами и фианитами. Очень красивое и неебически дорогое',
                                            imageUrl: '../../desktop.blocks/g-goods/images/good.png',
                                            weight: '4.5 грамм',
                                            carat: '0,07 карат',
                                            price: 1000000,
                                            store: 'Sunlight',
                                            storeUrl: '#',
                                            buyUrl: '#'
                                        }
                                    ]
                                }, {
                                    block: 'g-more-bids',
                                    url: '#',
                                    content: 18
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
