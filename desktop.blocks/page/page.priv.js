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
        mods: { theme: 'normal' },

        content: [
            blocks['g-header'](),
            blocks['g-category'](data.menu, env), {
                block: 'g-content',
                content: (data.content) ? JSON.parse(data.content) : null
            }, {
                block: 'g-footer',
                content: []
            }
        ]
    }
}
