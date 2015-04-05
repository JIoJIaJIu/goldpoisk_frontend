modules.define('g-filter-param', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
    BEMDOM.decl({block: 'g-filter-param', modName: 'list'}, {
        onSetMod: {
            'js': function () {
                this.bindTo(this.elem('title_arrow'), 'click', function(e) {
                    this._onParamClick(e);
                });

                this.bindTo(this.elem('title_text'), 'click', function(e) {
                    this._onParamClick(e);
                });
            }
        },

        _onParamClick: function (e) {
            var _target = $(e.currentTarget);
            this.toggleMod('state', 'opened', 'closed');
        }
    }, {});
    provide(BEMDOM);
});
