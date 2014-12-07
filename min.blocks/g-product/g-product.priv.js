blocks['g-product'] = function (data, env) {
	/**
	 *		@param
	 *		@key {string} url
	 *		@key {string} title
	 *		@key {string} imageUrl
	 *		@key {string} weight
	 *		@key {string} carat
	 *		@key {integer} price
	 *		@key {string} store
	 *		@key {string} storeUrl
	 *		@key {Boolean} [newPage] open in new page or not
	 *		@key {String} [buyUrl] buy url for item
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
		},
		url: data.url,
		title: data.title,
		imageUrl: data.imageUrl,
		weight: data.weight,
		carat: data.carat,
		price: data.price,
		store: data.store,
		storeUrl: data.storeUrl,
        newPage: data.newPage || false,
        buyUrl: data.buyUrl || null
	}
}
