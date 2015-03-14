modules.define('g-item-gallery', ['i-bem__dom', 'jquery', 'slider'], function (provide, BEMDOM, $) {
    BEMDOM.decl('g-item-gallery', {
        onSetMod: {
            js: function () {
                var main = this.elem('main_image').find('img');
                var thumbs = this.elem('preview_images');
                //TODO: memory leaks
                thumbs.bind('click', function (e) {
                    main.attr('src', $(e.target).attr('src'));
                })
            }
        }
    }, {});

    provide(BEMDOM);
});
