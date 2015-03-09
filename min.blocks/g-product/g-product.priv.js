blocks['g-product'] = function (data, env) {
	/**
	 *		@param
	 *		@key {String} title
	 *		@key {Number} number, article of item
	 *		@key {String} url
	 *		@key {String} image, url to main image
	 *		@key {String} weight
	 *		@key {String} carat
     *		@key {Number} count, count of items
	 *		@key {Boolean} [newPage] open in new page or not, default: true
     *		
	 *		@key {bool} [action]
	 *		@key {bool} [hit]
	 *		@key {string} [tape]
	 *		@key {bool} [like]
     *
     *      @key {Array} items
     *		    @of {Object} item
	 *		        @key {integer} price
	 *		        @key {string} store
	 *		        @key {string} storeUrl
	 *		        @key {String} buyUrl buy url for item
	 **/
    assertHas(data, 'title', 'Should be pointed title');
    assertHas(data, 'number', 'Should be pointed number');
    assertHas(data, 'url', 'Should be pointed url');
    assertHas(data, 'image', 'Should be pointed image');
    assertHas(data, 'weight', 'Should be pointed weight');
    assertHas(data, 'count', 'Should be pointed count');

	var block = {
		block: 'g-product',
		mods: {
			action: data.action ? 'yes' : false,
			hit: data.hit ? 'yes' : false,
			like: data.like ? 'yes' : false
		},
		url: data.url,
		title: data.title,
		imageUrl: data.image,
		weight: data.weight,
		carat: data.carat,
        newPage: data.newPage || true
	}

    if (data.count == 1) {
        block.price = data.minPrice;
        block.storeUrl = data.shopUrl;
        block.store = data.shopName;
        block.buyUrl = data.buyUrl;
    }
    /*
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
    */

    return block;
}
