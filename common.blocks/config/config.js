modules.define('config', ['i-bem'], function (provide) {
    provide({
        logLevel: 'debug',
        scripts: {
            slider: 'http://goldpoisk.ru/js/third-parties/jssor.slider.min.js',
            lodash: 'http://goldpoisk.ru/js/third-parties/lodash.min.js'
        },
        REST: {
            rings: {
                list: 'http://localhost:3000/success'
            },
            searchUrl: '/search'
        },
        page: {
            index: {
                url: '^/$',
                priv: 'index.content'
            },
            necklaces: {
                url: '^/necklaces$',
                priv: 'category.content'
            },
            chains: {
                url: '^/chains$',
                priv: 'category.content'
            },
            pendants: {
                url: '^/pendants$',
                priv: 'category.content'
            },
            bracelets: {
                url: '^/bracelets$',
                priv: 'category.content'
            },
            rings: {
                url: '^/rings$',
                priv: 'category.content'
            },
            earrings: {
                url: '^/earrings$',
                priv: 'category.content'
            },
            brooches: {
                url: '^/brooches$',
                priv: 'category.content'
            },
            watches: {
                url: '^/watches$',
                priv: 'category.content'
            },
            cutlery: {
                url: '^/cutlery$',
                priv: 'category.content'
            },
            item: {
                url: '^/item/[\\w\\d-]+$',
                priv: 'item.content'
            }
        }
    })
});
