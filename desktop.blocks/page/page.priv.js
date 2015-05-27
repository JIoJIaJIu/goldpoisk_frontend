var blocks = {};
var pages = {};
blocks['page'] = function (data, env) {
    return {
        block: 'page',
        title: data.title,
        favicon: '/media/favicon.ico',
        head: [
            { elem: 'meta', attrs: { name: 'description', content: data.description } },
            { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
            { elem: 'css', url:  '/css/index.css' }
        ],
        scripts: [
            { elem: 'js', url: env.production ? 'http://yastatic.net/jquery/2.1.3/jquery.min.js' : '/js/third-parties/jquery.min.js' },
            { elem: 'js', url: '/js/third-parties/jssor.slider.min.js' },
            { elem: 'js', url: '/js/third-parties/lodash.min.js' },
            { elem: 'js', url: '/js/index.bemhtml.js' },
            { elem: 'js', url: '/js/index.priv.js' },
            { elem: 'js', url: '/js/index.js' }
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
        title: 'Самый большой каталог ювелирных изделий',
        description: 'Goldpoisk - это все ювелирные изделия от лучших производителей на одном сайте. Огромный выбор из 150 000 товаров. Удобный, бесплатный поиск и фильтр по подбору нужного ювелирного изделия.',
        menu: data.menu,
        content: [
            {
                block: 'g-content',
                content: [
                    blocks['g-promotion'](data.promo, env),
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
                    }, {
                        block: 'g-section',
                        title: 'Goldpoisk - самый большой каталог ювелирных изделий',
                        description: 'Все ювелирные изделия от лучших производителей собраны здесь.<br>Огромный выбор из 150000 товаров.'
                    },
                    blocks['g-bids']({
                        count: data.count || 0, //TODO:
                        products: data.products,
                        url: '#'
                    }),
                    {
                        block: 'g-cooperation',
                        content: []
                    }
                ]
            }
        ]
    }, env)
}

pages['index.str'] = function (data, env) {
    return pages['index'](JSON.parse(data), env);
}

pages['index.content'] = function (data, env) {
    return [
        blocks['g-promotion'](data.promo, env),
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
        }, {
            block: 'g-section',
            title: 'Goldpoisk - самый большой каталог ювелирных изделий',
            description: 'Все ювелирные изделия от лучших производителей собраны здесь.<br>Огромный выбор из 150000 товаров.'
        },
        blocks['g-bids']({
            count: data.count || 0, //TODO:
            products: data.products,
            url: '#'
        }),
        {
            block: 'g-cooperation',
            content: []
        }
    ]
}

pages['notfound.content'] = function (data, env) {
    return blocks['g-bids']({
        count: data.count || 0, //TODO:
        products: data.products,
        url: '#'
    }, {
        error404: true
    });
}

/**
 * data.menu
 * {String} !data.products
 */
pages['category'] = function (data, env) {
    env = env || {};
    env.headerJs = true;

    return blocks['page']({
        title: data.title,
        description: data.description,
        menu: data.menu,
        content: {
            block: 'g-content',
            content: pages['category.content'](data, env)
        }
    }, env);
}

pages['category.json'] = function (data, env) {
    return pages['category'](JSON.parse(data), env)
}

pages['category.content'] = function (data, env) {
    return [
        {
            block: 'g-category-title',
            title: data.category,
            count: data.count
        }, {
            block: 'g-link',
            mods: { type: 'display', state: 'hidden' }
        },
        blocks['g-goods']({
            count: data.count,
            list: data.products,
            sortParams: data.sortParams,
            filters: data.filters
        }, {showFrame: true}),
        blocks['g-paginator'](data.paginator)
    ]
}

/**
 * data.menu
 * data.item
 */
pages['item'] = function (data, env) {
    assertHas(data, 'category', 'Should point category');
    assertHas(data, 'categoryUrl', 'Should point categoryUrl');
    return blocks['page']({
        menu: data.menu,
        content: {
            block: 'g-content',
            content: [{
                    block: 'g-breadcrumbs',
                    root: {
                        title: 'Главная',
                        url: '/'
                    },
                    path: [{
                            title: data.category,
                            url: data.categoryUrl
                        }, {
                            title: data.title,
                            url: data.url
                    }]
            }, {
                block: 'g-item',
                content: [
                    blocks['g-item'](data.item, {big: true})
                ]
            }]
        }
    }, env)
}

pages['item.content'] = function (data, env) {
    assertHas(data, 'category', 'Should point category');
    assertHas(data, 'categoryUrl', 'Should point categoryUrl');
    return [{
            block: 'g-breadcrumbs',
            root: {
                title: 'Главная',
                url: '/'
            },
            path: [{
                    title: data.category,
                    url: data.categoryUrl
                }, {
                    title: data.title,
                    url: data.url
            }]
        },
        blocks['g-item'](data, {big: true, independent: true})
    ]
}

//TODO:
pages['item.json'] = function (data, env) {
    return blocks['page']({
        menu: data.menu,
        content: {
            block: 'g-content',
            content: [
                {
                    block: 'g-item',
                    content: [
                        blocks['g-item'](JSON.parse(data.item), {big: true})
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

function declension(count, word) {
    /**
     *  @param {Integer} count
     *  @param {String} word
     *  @return {String} result = count + word
     **/
    count = count.toString();
    var basis = word.substr(0, word.length - 2);
    var ending = word.substr(-2);
    var lastLetters = count.substr(-2);
    if (ending == 'ие') {
        if (["11", "12", "13", "14"].indexOf(lastLetters) != -1) {
            return count + " " + basis + 'ий';
        }
        switch (lastLetters.substr(-1)) {
            case '1':
                return count + " " + basis + ending;
                break;
            case '2':
            case '3':
            case '4':
                return count + " " + basis + 'ия';
                break;
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                return count + " " + basis + 'ий';
                break;
            default:
                break;
        }
    } else if (ending == 'ар') {
        if (['11', '12', '13', '14'].indexOf(lastLetters) != -1) {
            return basis + ending + 'ов';
        }
        switch (lastLetters.substr(-1)) {
            case '1':
                return basis + ending;
                break;
            case '2':
            case '3':
            case '4':
                return basis + ending + 'а';
                break;
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                return basis + ending + 'ов'
        }
    } else {
        return 'Oops';
    }
}

function capitalize (word) {
    word = word || "";
    word = word.toLowerCase();
    word = word.charAt(0).toUpperCase() + word.substr(1);
    return word;
}
