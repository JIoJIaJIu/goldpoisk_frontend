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
	 **/
	return {
		block: 'g-product',
		mods: { 
			action: data.action ? 'yes' : false,
			hit: data.hit ? 'yes' : false,
			like: data.like ? 'yes' : false
		}
		title: data.title,
		image: data.image,
		pw: data.pw,
		jw: data.jw,
		price: data.price,
		shop: data.shop,
	}
}