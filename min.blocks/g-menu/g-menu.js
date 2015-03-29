modules.define('g-menu', ['i-bem__dom', 'jquery', 'router'], function(provide, BEMDOM, $, router) {
    BEMDOM.decl('g-menu', {
        onSetMod: {
            'js': function () {
                _.forEach(this.findBlocksInside('g-menu-item'), function (item) {
                    item.bindTo('click', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        router.route(item.params.href);
                    });
                })
            }
        }
    }, {});
    provide(BEMDOM); 
});