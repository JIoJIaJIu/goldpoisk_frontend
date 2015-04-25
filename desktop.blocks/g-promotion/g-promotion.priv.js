/**
 *  @param {Array} data
 *    @of {Object} promo
 *      @key {String} src
 *      @key {String} title
 *      @key {Array} items
 *        @of {Object} item
 *          @key {String} title
 *          @key {Number} price
 *          @key {String} url
 *          @key {Number} x
 *          @key {Number} y
 *  @param {Object} env
 */
blocks['g-promotion'] = function (data, env) {
    var promos = [];
    var markers = [];

    for (var i = 0, length = data.length; i < length; i++) {
        var promo = data[i];
        var items = promo.items.map(function (item) {
            return {
                block: 'g-promotion-item',
                coord: [item.x, item.y],
                content: [{
                    elem: 'title',
                    title: item.title,
                    url: item.url
                }, {
                    elem: 'price',
                    price: item.price
                }]
            };
        });

        promos.push({
            elem: 'item',
            content: [{
                block: 'image',
                tag: 'img',
                attrs: {
                    src: promo.src,
                    alt: promo.title,
                }
            }].concat(items)
        });

        markers.push({
            block: 'g-promotion-marker',
            index: i
        });
    }

    return {
        block: 'g-promotion',
        js: 'true',
        items: promos,
        content: [{
            block: 'g-promotion-markers-list',
            content: markers
        }]
    }
}
