blocks['g-pride'] = function (data, env) {
    return {
        block: 'g-pride',
        content: [
            {
                block: 'g-pride-item',
                mods: { type: 'brown' },
                label: 'Лучшие производители ювелирных изделий'
            }, {
                block: 'g-pride-item',
                mods: { type: 'beige' },
                label: 'Огромный ассортимент представлен в каталоге'
            }, {
                block: 'g-pride-item',
                mods: { type: 'gold' },
                label: 'Только проверенные партнёры и предложения'
            }, {
                block: 'g-pride-item',
                mods: { type: 'gray' },
                label: 'Простой и удобный поиск по параметрам'
            }
        ]
    }
}
