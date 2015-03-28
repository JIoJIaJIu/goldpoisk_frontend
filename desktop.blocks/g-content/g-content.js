modules.define('g-content', ['i-bem__dom', 'router'], function(provide, BEMDOM, router){
    BEMDOM.decl('g-content', {
        onSetMod: {
            js: function () {
                router.init(this);
            }
        }
    }, {});
    provide(BEMDOM);
});