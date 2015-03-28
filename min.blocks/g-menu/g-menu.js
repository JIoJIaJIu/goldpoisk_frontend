modules.define('g-menu', ['i-bem__dom', 'jquery', 'router'], function(provide, BEMDOM, $, router) {
    BEMDOM.decl('g-menu', {
        onSetMod: {
            'js': function () {
                console.log('inited');
                _.forEach(this.findBlocksInside('g-menu-item'), function (item) {
                    console.log('item');
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