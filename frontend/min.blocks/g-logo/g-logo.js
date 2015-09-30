modules.define('g-logo', ['i-bem__dom', 'router'], function(provide, BEMDOM, router) {
    BEMDOM.decl('g-logo', {
        onSetMod: {
           'js': function () {
                this.bindTo('link', 'click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    router.route('/');
                })
           }
        }
    }, {});
    provide(BEMDOM);
});