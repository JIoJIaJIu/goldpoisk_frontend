({
    block: 'page',
    title: 'Ошибка',
    head: [{
        elem: 'css',
        url: 'error.css'
    }],
    scripts: [{
        elem: 'js',
        url: '_error.bemhtml.js'
    }, {
        elem: 'js',
        url: 'error.js'
    }, {
        elem: 'js',
        url: '../../static/js/third-parties/lodash.min.js'
    }, {
        elem: 'js',
        url: '../../static/js/third-parties/jquery.min.js'
    }],
    content: [{
        block: 'g-header',
        content: [{
            block: 'g-logo',
            description: 'Крупнейший поиск ювелирных изделий'
        },/*,
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
            content: []
        }] 
    }, {
        block: 'g-content',
        content: [{
            block: 'g-error',
            code: 404,
            content: 'Страницу похитили, но оставили кое-что взамен'
        }, {
            block: 'g-bids',
            content: [{
                block: 'g-goods',
                content: [{
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
                }]
            }, {
                block: 'g-link',
                mods: { 'more': true },
                url: '#',
                content: 'Ещё 18 предложений'
            }]
        }]
    }, {
        block: 'g-footer',
        content: []
    }]
})