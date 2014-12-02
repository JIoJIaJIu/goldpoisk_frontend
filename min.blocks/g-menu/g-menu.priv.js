blocks['g-menu'] = function (data, env) {
    return {
        block: 'g-menu',
        content: data.map(function (item) {
            return {
                block: 'g-item',
                mods: { type: item.type, state: (item.isActive) ? 'active' : null },
                href: item.href,
                label: item.label
            }
        })
    }
}
