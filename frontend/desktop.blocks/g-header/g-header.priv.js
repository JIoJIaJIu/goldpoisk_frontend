blocks['g-header'] = function (data, env) {
    var block = {
        block: 'g-header',
        mods: { theme: 'light' },
        content: [
            {
                block: 'g-logo',
                description: 'Крупнейший поиск ювелирных изделий'
            }, /*
            {
                elem: 'basket',
                content: [
                    {
                        tag: 'img',
                        attrs: {src: '../../desktop.blocks/g-header/cart.png'},
                    },
                    {
                        tag: 'span',
                        content: 'Карзина пуста. Ищите товары в каталоге'
                    }
                ]
            },*/
            {
                block: 'g-desires',
                mods: { empty: true }
            }, {
                elem: 'up',
                mix: [
                    { block: 'g-button_up' },
                    { block: 'g-button_text-light-up' }
                ],
                js: true
            }, {
                block: 'g-support',
                content: []
            }
        ]
    }

    if (env && env.headerJs)
        block.js = true;

    return block;
}
