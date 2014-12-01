var blocks = {}
blocks['page'] = function (data, env) {
    return {
        block: 'page',
        title: 'GoldPoisk',
        favicon: '/favicon.ico',
        head: [
            { elem: 'meta', attrs: { name: 'description', content: '' } },
            { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
            { elem: 'css', url:  'css/index.css' }
        ],
        scripts: [{ elem: 'js', url: '_index.js' }],
        mods: { theme: 'normal' },
        content: [
            { block: 'g-header' },
            blocks['g-category'](data.menu, env)
        ]
    }
}
