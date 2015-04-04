modules.define('g-filter', ['i-bem__dom', 'jquery', 'logger'], function(provide, BEMDOM, $, logger) {
    BEMDOM.decl('g-filter', {
        onSetMod: {
            js: {
                'inited': function () {
                    var self = this;
                    this._logger = logger.Logger('g-filter');
                    this.bindTo(this.elem('button'), 'click', function (e) {
                        this.toggleMod('hidden');
                    });

                    self._logger.debug(this.findBlockInside('g-button'), 'yaz');
                    this.findBlockInside('g-button').bindTo(function (e) {
                        self._logger.debug('Searching..');
                    });
                }
            },
            '': function () {
                this._logger = null;
                this.unbindFrom(this.elem('button'), 'click');
            }
        },

        _logger: null
    }, {});
    provide(BEMDOM);
})
