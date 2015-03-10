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
	 *		@key {Boolean} [newPage] open in new page or not
     *		
	 *		@key {bool} [action]
	 *		@key {bool} [hit]
	 *		@key {string} [tape]
	 *		@key {bool} [like]
     *
     *		@key {Object} [item]
	 *		    @key {integer} price
	 *		    @key {string} store
	 *		    @key {string} storeUrl
	 *		    @key {String} buyUrl buy url for item
	 **/
	var block = {
		block: 'g-product',
		mods: {
			action: data.action ? true : false,
			hit: data.hit ? true : false,
			like: data.like ? true : false
		},
		url: data.url,
		title: data.title,
		imageUrl: data.imageUrl,
		weight: data.weight,
		carat: data.carat,
        newPage: data.newPage || false
	}

    if (data.item) {
        block.item = {
            price: data.price,
            store: data.store,
            storeUrl: data.storeUrl,
            buyUrl: data.buyUrl || null
        }
    }

    if (env.js) {
        var features = [];
        block.js = {
            title: data.title,
            features: features,
            images: data.images,
            item: data.item
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
