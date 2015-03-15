modules.define('g-item-gallery', ['i-bem__dom', 'jquery', 'slider'], function (provide, BEMDOM, $) {
    BEMDOM.decl('g-item-gallery', {
        onSetMod: {
            js: function () {
                var main = this.elem('main_image').find('img');
                var thumbs = this.findBlocksInside('preview_images', 'image');
                //TODO: memory leaks
                thumbs.forEach(function (thumb) {
                    thumb.bindTo('click', function (e) {
                        thumbs.forEach(function (t) {
                            t.delMod('state');
                        });
                        main.attr('src', thumb.params.src);
                        thumb.setMod('state', 'active');
                    });
                })
            }
        }
    }, {});

    provide(BEMDOM);
});
