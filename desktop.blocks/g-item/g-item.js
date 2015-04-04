modules.define('g-item', ['i-bem__dom', 'router'], function(provide, BEMDOM, router) {
    BEMDOM.decl('g-item', {
        onSetMod: {
            js: function () {
                var that = this;
                var heading = this.findBlockInside('g-heading');
                heading.bindTo('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();

                    var url = that.params.url;

                    router.route(url);
                })
            }
        }
    }, {});

    provide(BEMDOM);
});