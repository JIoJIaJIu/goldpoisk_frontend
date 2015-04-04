modules.define('g-menu', ['i-bem__dom', 'jquery', 'router'], function(provide, BEMDOM, $, router) {
    BEMDOM.decl('g-menu', {
        onSetMod: {
            js: {
                'inited': function () {
                    _.forEach(this.findBlocksInside('g-menu-item'), function (item) {
                        item.bindTo('click', function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            router.route(item.params.href);
                        });
                    })
                },
                '': function () {
                    _.forEach(this.findBlocksInside('g-menu-item'), function (item) {
                        item.unbindFrom('click');
                    })
                }
            }
        },

        selectByUrl: function (url) {
            _.forEach(this.findBlocksInside('g-menu-item'), function (item) {
                if (item.params.href == url) {
                    item.setMod('state', 'active');
                } else {
                    item.delMod('state');
                }
            });
        }
    }, {});
    provide(BEMDOM); 
});
