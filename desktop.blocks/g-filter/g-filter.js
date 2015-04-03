modules.define('g-filter', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
    BEMDOM.decl('g-filter', {
        onSetMod: {
            'js': function () {
                this.bindTo(this.elem('button'), 'click', function (e) {
                    console.log('click button');
                    this.toggleMod('hidden');
                });
            }
        }
    }, {});
    provide(BEMDOM);
})