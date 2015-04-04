modules.define('g-filter', ['i-bem__dom', 'jquery', 'logger'], function(provide, BEMDOM, $, logger) {
    BEMDOM.decl('g-filter', {
        onSetMod: {
            'js': function () {
                this.bindTo(this.elem('button'), 'click', function (e) {
                    logger.debug('click button');
                    this.toggleMod('hidden');
                });
            }
        }
    }, {});
    provide(BEMDOM);
})
