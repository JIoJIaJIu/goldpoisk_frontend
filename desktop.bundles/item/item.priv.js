/* ../../desktop.blocks/page/page.priv.js: begin */ /**/
var blocks = {}
blocks['page'] = function (data, env) {
    return {
        block: 'page',
        title: 'GoldPoisk',
        favicon: '/media/favicon.ico',
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
;
/* ../../desktop.blocks/page/page.priv.js: end */ /**/

/* ../../desktop.blocks/g-header/g-header.priv.js: begin */ /**/
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
;
/* ../../desktop.blocks/g-header/g-header.priv.js: end */ /**/

/* ../../min.blocks/g-menu/g-menu.priv.js: begin */ /**/
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
;
/* ../../min.blocks/g-menu/g-menu.priv.js: end */ /**/

/* ../../desktop.blocks/g-content/g-content.priv.js: begin */ /**/
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
;
/* ../../desktop.blocks/g-content/g-content.priv.js: end */ /**/

/* ../../desktop.blocks/g-item-galery/g-item-galery.priv.js: begin */ /**/
blocks['g-item-galery'] = function (data, env) {
	/**
	 *		@key {Number} [index] default = 0
	 *		@key {Array} images
	 **/
	 var MAX_IMG_COUNTS = 4;
	 return [
	 	block: 'g-item-galery',
	 	content: [
	 		{
	 			elem: 'title',
	 			title: 'Фото',
	 			current: data.index,
	 			count: data.images.length() > MAX_IMG_COUNTS ? MAX_IMG_COUNTS : data.images.length();
	 		},
	 		{
	 			elem: 'preview_images',
	 			images: data.images.length() > MAX_IMG_COUNTS ? data.images.slice(0, MAX_IMG_COUNTS) : data.images;
	 		},
	 		{
	 			elem: 'main_image',
	 			image: data.images[index]
	 		}
	 	]
	 ]
};
/* ../../desktop.blocks/g-item-galery/g-item-galery.priv.js: end */ /**/

/* ../../min.blocks/g-item-description/g-item-description.priv.js: begin */ /**/
blocks['g-item-description'] = function (data, env) {
	return {
		block: 'g-item-description',
		pars: [
		
		]
	}
};
/* ../../min.blocks/g-item-description/g-item-description.priv.js: end */ /**/

/* ../../desktop.blocks/g-goods/g-goods.priv.js: begin */ /**/
blocks['g-goods'] = function (data, env) {
    var list = [];
    for (var i = 0, length = data.list.length; i < length; i++) {
        var item = data.list[i];
        list.push(blocks['g-product'](item));
    }
    return list;
}
;
/* ../../desktop.blocks/g-goods/g-goods.priv.js: end */ /**/

/* ../../min.blocks/g-product/g-product.priv.js: begin */ /**/
blocks['g-product'] = function (data, env) {
	/**
	 *		@param
	 *		@key {string} title
	 *		@key {string} image
	 *		@key {string} pw
	 *		@key {string} jw
	 *		@key {string} price
	 *		@key {string} shop
	 *		@key {bool} [action]
	 *		@key {bool} [hit]
	 *		@key {string} [tape]
	 *		@key {bool} [like]
	 *		@key {string} href
	 **/
	return {
		block: 'g-product',
		mods: { 
			action: data.action ? 'yes' : false,
			hit: data.hit ? 'yes' : false,
			like: data.like ? 'yes' : false
		},
		title: data.title,
		image: data.image,
		pw: data.pw,
		jw: data.jw,
		price: data.price,
		shop: data.shop,
		href: data.href
	}
}
;
/* ../../min.blocks/g-product/g-product.priv.js: end */ /**/

