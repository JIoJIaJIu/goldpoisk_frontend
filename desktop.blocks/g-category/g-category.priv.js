blocks['g-category'] = function (data, env) {
    return {
        block: 'g-category',
        content: data.map(function (item) {
            return {
                block: 'g-item',
                mods: { type: item.type },
                label: item.label
            }
        })
    }
}
