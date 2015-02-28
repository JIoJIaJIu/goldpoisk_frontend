blocks['g-product'] = function (data, env) {
	/**
	 *		@param
	 *		@key {string} url
	 *		@key {String} title
	 *		@key {Number} number
	 *		@key {string} imageUrl
	 *		@key {Array} images
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
	var block = {
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

    if (env.js) {
        var features = [];
        block.js = {
            title: data.title,
            features: features,
            images: data.images
        }

        features.push({
            'Артикул': data.number
        });

        if (data.weight)
            features.push({
                'Вес': data.weight
            });

        if (data.carat)
            features.push({
                'Карат': data.carat
            })
    }

    return block;
}
