blocks['g-product'] = function (data, env) {
	/**
	 *		@param
	 *		@key {string} title
	 *		@key {string} image
	 *		@key {string} pw
	 *		@key {string} jw
	 *		@key {string} price
	 *		@key {string} shop
	 *		@key {Boolean} [newPage] open in new page or not
	 *		@key {String} [buyUrl] buy url for item
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
		href: data.href,
        newPage: data.newPage || false,
        buyUrl: data.buyUrl || null
	}
}
