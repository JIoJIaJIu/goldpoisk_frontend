({
    block: 'page',
    title: 'Title of the page',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: '' } },
        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        { elem: 'css', url: '_index.css' },
        { elem: 'css', url: 'http://fotorama.s3.amazonaws.com/4.5.2/fotorama.css' }
    ],
    scripts: [{ elem: 'js', url: '_index.js' }],
    scripts: [{ elem: 'js-fotorama', url: 'http://fotorama.s3.amazonaws.com/4.5.2/fotorama.js' }],
    scripts: [{ elem: 'js-jquery', url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'}],
    mods: { theme: 'normal' },
    content: [
        {
            block: 'g-header',
            content: [
                {
                    elem: 'logo',
                    content: [
                        {
                            block: 'g-logo',
                            description: 'Крупнейший поиск ювелирных изделий'
                        }
                    ]
                },
                {
                    elem: 'basket',
                    content: [
                        {
                            tag: 'img',
                            attrs: {src: '../../desktop.blocks/g-header/cart.png'},
                        },
                        {
                            tag: 'span',
                            content: 'Карзина пуста. Ищите товары в каталоге'
                        }
                    ]
                },
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
                },
            ]
        },
/*
        {
            block: 'g-checkbox',
            label: 'Линии любви'
        },
        {
            block: 'g-checkbox',
            label: 'Sun light'
        },
        {
            block: 'g-logo',
//            mods: { color_theme: 'xmas' },
            description: 'Крупнейший поиск ювелирных изделий'
        },*/
        {
            block: 'g-category',
            content: [
                {
                    block: 'g-item',
                    mods: { type: 'necklaces' },
                    label: 'КОЛЬЕ'
                },
                {
                    block: 'g-item',
                    mods: { type: 'chains' },
                    label: 'ЦЕПИ'
                },
                {
                    block: 'g-item',
                    mods: { type: 'pendants' },
                    label: 'ПОДВЕСКИ'
                },
                {
                    block: 'g-item',
                    mods: { type: 'bracelets' },
                    label: 'БРАСЛЕТЫ'
                },
                {
                    block: 'g-item',
                    mods: { type: 'rings' },
                    label: 'КОЛЬЦА'
                },
                {
                    block: 'g-item',
                    mods: { type: 'earrings' },
                    label: 'СЕРЬГИ'
                },
                {
                    block: 'g-item',
                    mods: { type: 'brooches' },
                    label: 'БРОШИ<br>И ЗАЖИМЫ'
                },
                {
                    block: 'g-item',
                    mods: { type: 'watches' },
                    label: 'ЧАСЫ'
                },
                {
                    block: 'g-item',
                    mods: { type: 'cutlery' },
                    label: 'СТОЛОВЫЕ<br>ПРИБОРЫ'
                }
            ]
        },
        {
            block: 'g-content',
            content: [
                {
                    block: 'g-promotion',
                    content: [
                        {
                            block: 'fotorama',
                        }
                    ]
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
                    block: 'g-section',
                    mods: { type: 'slogan' },
                    title: 'Goldpoisk - самый большой каталог ювелирных изделий',
                    description: 'Все ювелирные изделия от лучших производителей собраны здесь.<br>Огромный выбор из 150000 товаров.'
                },
                {
                    block: 'g-section',
                    mods: { type: 'subscription' },
                    title: 'Лучшие предложения от наших партнёров',
                    description: 'Хотите первыми узнавать об акциях и получать самые выгодне предложения?<br>Подпишитесь на нашу рассылку. Никакой лишней информации,<br>только самые свежие и лучшие предложения от наших партнёров!',
                },
                {
                    block: 'g-goods',
                    goods: [
                        {
                            title: 'Кольцо с 21 бриллиантом',
                            image: '../../desktop.blocks/g-goods/good.png',
                            pw: '4,5 грамм',
                            jw: '0,07 карат',
                            price: '3333Р',
                            shop: 'Sunlight',
                            action: true,
                        },
                        {
                            hit: true,
                            tape: 'Хит продаж'
                        },
                        {
                            like: true,
                        },
                        {
                        },
                        {
                            block: 'clear'
                        }
                    ]
                }
            ]
        },
        {
            block: 'g-cooperation',
            content: [

                ]
        },
        {
            block: 'g-footer',
            content: [

            ]
        }
    ]
})
