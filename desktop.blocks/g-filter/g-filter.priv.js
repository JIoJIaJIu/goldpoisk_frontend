blocks['g-filter'] = function (data, env) {
    return {
        block: 'g-filter',
        mods: {'hidden': false },
        tag: 'section',
        content: [{
            elem: 'title',
            tag: 'h1',
            content: 'Поиск по параметрам'
        }, {
            elem: 'list',
            content: []
        }, {
            elem: 'button'
        }]
    }
}
