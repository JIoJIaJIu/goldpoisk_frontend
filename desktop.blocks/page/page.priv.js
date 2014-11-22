var blocks = {}
blocks['page'] = function (data, env) {
    return {
        block: 'page',
        title: 'GoldPoisk',
        favicon: '/favicon.ico',
        head: [
            { elem: 'meta', attrs: { name: 'description', content: '' } },
            { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        ].concat(
            data.css.map(function (url) {
                return { elem: 'css', url: url }
            })
        ),
        scripts: [{ elem: 'js', url: '_index.js' }],
        mods: { theme: 'normal' },
        content: []
    }
}
