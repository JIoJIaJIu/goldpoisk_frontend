blocks['g-content.index'] = function (data, env) {
    return [{
        block: 'g-promotion',
        content: [
            {
                block: 'fotorama',
                src: data.promo[0]
            }
        ]
    }]
}
