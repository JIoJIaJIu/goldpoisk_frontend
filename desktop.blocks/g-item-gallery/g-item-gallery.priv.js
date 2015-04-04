blocks['g-item-gallery'] = function (data, env) {
	/**
     *  @param {Object} data
	 *    @key {Array} images
	 *    @key {Number} [index] default = 0
     *
     *  @param {Object} [env]
     *    @key {Boolean} big, set modificator 'big'
	 **/
     env = env || {};

	 var MAX_IMG_COUNTS = 4;
     var index = data.index || 0;
	 var block = {
	 	block: 'g-item-gallery',
        images: data.images,
	 	content: [{
	 			elem: 'title',
	 			title: 'Фото',
	 			current: index,
	 			count: (data.images.length > MAX_IMG_COUNTS) ? MAX_IMG_COUNTS : data.images.length
	 		}, {
	 			elem: 'preview_images',
	 			images: (data.images.length > MAX_IMG_COUNTS) ? data.images.slice(0, MAX_IMG_COUNTS) : data.images
	 		}, {
	 			elem: 'main_image',
	 			image: data.images[index]
	 		}
	 	]
	 }

     if (env.big) {
        block.mods = { type: 'big' };
     }
     return block;
}
