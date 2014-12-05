blocks['g-content.index'] = function (data, env) {
    return [{
        block: 'g-promotion',
        content: {
                block: 'fotorama',
                src: data.promo[0]
        }
    }, {
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
        block: 'g-goods',
        content: (data.products) ? JSON.parse(data.products) : []
    }]
}
