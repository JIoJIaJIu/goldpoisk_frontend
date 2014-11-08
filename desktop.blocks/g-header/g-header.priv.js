blocks['g-header'] = function () {
    return ({
        block: 'g-header',
        content: [
            {
                elem: 'logo',
                content: [
                    {
                        block: 'g-logo',
                        description: 'Крупнейший поиск ювелирных изделий'
                    }
                ]
            },
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
            },
            {
                elem: 'desire',
                content: [
                    {
                        tag: 'img',
                        attrs: {src: '../../desktop.blocks/g-header/heart.png'},
                    },
                    {
                        tag: 'span',
                        content: 'Нет товаров в списке желаний'
                    }
                ] 
            },
            {
                block: 'g-support',
                content: [
                ]
            },
            {
                elem: 'clear',
            }
        ]
    })
}
