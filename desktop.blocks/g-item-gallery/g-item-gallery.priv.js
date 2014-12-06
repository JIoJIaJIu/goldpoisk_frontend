blocks['g-item-gallery'] = function (data, env) {
	/**
     *      
	 *  @param {Number} [index] default = 0
	 *  @param {Array} images
     *  @param {String} mainImg
	 **/
	 var MAX_IMG_COUNTS = 4;
     var index = data.index || 0;
	 return [{
	 	block: 'g-item-gallery',
	 	content: [
	 		{
	 			elem: 'title',
	 			title: 'Фото',
	 			current: index,
	 			count: (data.images.length > MAX_IMG_COUNTS) ? MAX_IMG_COUNTS : data.images.length
	 		},
	 		{
	 			elem: 'preview_images',
	 			images: (data.images.length > MAX_IMG_COUNTS) ? data.images.slice(0, MAX_IMG_COUNTS) : data.images
	 		},
	 		{
	 			elem: 'main_image',
	 			image: data.mainImg
	 		}
	 	]
	 }]
}
