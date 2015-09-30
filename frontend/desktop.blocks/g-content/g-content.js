modules.define('g-content', ['i-bem__dom', 'router'], function(provide, BEMDOM, router){
    BEMDOM.decl('g-content', {
        onSetMod: {
            js: {
                'inited': function () {
                    router.init(this);
                },

                '': function () {
                    router.finalize();
                }
            }
        },

        update: function (bemjson) {
            BEMDOM.update(
                this.domElem,
                BEMHTML.apply(bemjson)
            );
        }
    }, {});
    provide(BEMDOM);
});
