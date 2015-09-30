modules.define('g-item-gallery', ['i-bem__dom'], function (provide, BEMDOM) {
    BEMDOM.decl('g-item-gallery', {
        onSetMod: {
            js: {
                'inited': function () {
                    var main = this.elem('main_image').find('img');
                    var thumbs = this.findBlocksInside('preview_images', 'image');
                    var index = 0;

                    //TODO: live event
                    thumbs.forEach(function (thumb, i) {
                        thumb.bindTo('click', function (e) {
                            thumbs.forEach(function (t) {
                                t.delMod('state');
                            });
                            main.attr('src', thumb.params.src);
                            thumb.setMod('state', 'active');
                            index = i;
                        });
                    });

                    this.bindTo(this.elem('zoom'), 'click', function (e) {
                        this.__self.getGallery.call(this, index).setMod('showed');
                    });
                },

                '': function () {
                    //Finalization
                }
            }
        }
    }, {
        getGallery: function (index) {
            //TODO: recover cache
            //TODO: good destructing?
            if (this.__self.gallery) {
                BEMDOM.destruct(this.__self.gallery.domElem);
            }

            var html = BEMHTML.apply({
                block: 'g-gallery',
                index: index,
                images: this.params.images
            });

            var dom = BEMDOM.append(document.body, html);
            this.__self.gallery = this.findBlockOn(dom, 'g-gallery');
            return this.__self.gallery;
        }
    });

    provide(BEMDOM);
});
