/**
 *  @param {Object} data
 *    @key {String} title
 *    @key {Number} number, article of item
 *    @key {String} url
 *    @key {String} [jsonUrl], json data about item, required with js=true
 *    @key {String} image, url to main image
 *    @key {String} weight
 *    @key {String} carat
 *    @key {Number} count, count of items
 *    @key {Boolean} [newPage] open in new page or not, default: true
 *
 *    @key {Boolean} [action]
 *    @key {Boolean} [hit]
 *    @key {String} [tape]
 *    @key {Boolean} [like]
 *
 *    @key {Array} items
 *      @of {Object} item
 *        @key {Integer} price
 *		  @key {String} store
 *		  @key {String} storeUrl
 *		  @key {String} buyUrl buy url for item
 *
 *	@param {Object} env
 *	  @key {Boolean} js, enable javascript on this node or not
 **/
blocks['g-product'] = function (data, env) {
    assertHas(data, 'title', 'Should be pointed title');
    assertHas(data, 'number', 'Should be pointed number');
    assertHas(data, 'url', 'Should be pointed url');
    assertHas(data, 'image', 'Should be pointed image');
    assertHas(data, 'weight', 'Should be pointed weight');
    assertHas(data, 'count', 'Should be pointed count');

	var block = {
		block: 'g-product',
		mods: {
			action: data.action ? true : false,
			hit: data.hit ? true : false,
			like: data.like ? true : false
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

    if (env && env.js) {
        assertHas(data, 'jsonUrl', 'Should be pointed json url');
        block.js = true;
        block.jsonUrl = data.jsonUrl;
    }

    return block;
}
