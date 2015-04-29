/**
 *  @param {Object} data
 *    @key {Number} id
 *    @key {String} title
 *    @key {Number} number, article of item
 *    @key {Number} count, count of items
 *    @key {String} url
 *    @key {Number} minPrice, min price
 *    @key {Number} [maxPrice], max price
 *    @key {String} [jsonUrl], json data about item, required with js=true
 *    @key {String} image, url to main image
 *    @key {String} weight
 *    @key {String} carat
 *    @key {Boolean} [newPage] open in new page or not, default: true
 *
 *    @key {Boolean} [action]
 *    @key {Boolean} [hit]
 *    @key {String} [tape]
 *    @key {Boolean} [like]
 *
 *  @param {Object} env
 *    @key {Boolean} [showFrame], show frame on click or not
 **/
blocks['g-product'] = function (data, env) {
    assertHas(data, 'id', 'Should point id');
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
            hit: data.hit ? true : false
        },
        like: data.like,
        id: data.id,
        url: data.url,
        title: data.title,
        imageUrl: data.image,
        weight: data.weight,
        carat: data.carat,
        newPage: data.newPage || true
    }

    //TODO:
    //if (data.count == 1) {
    block.price = data.minPrice;
    block.storeUrl = data.shopUrl;
    block.store = data.shopName;
    block.buyUrl = data.buyUrl;

    if (env && env.showFrame) {
        assertHas(data, 'jsonUrl', 'Should be pointed json url');
        block.jsonUrl = data.jsonUrl;
        block.showFrame = true;
    }

    return block;
}
