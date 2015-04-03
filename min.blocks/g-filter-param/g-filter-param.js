modules.define('g-filter-param', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
    BEMDOM.decl('g-filter-param', {
        _onParamClick: function (e) {
            var _target = $(e.currentTarget);
            this.toggleMod('state', 'open', 'closed');
        },
        onSetMod: {
            'js': function () {
                this.bindTo(this.elem('title_arrow'), 'click', function(e) {
                    console.log('click ready');
                    this._onParamClick(e);
                });
                this.bindTo(this.elem('title_text'), 'click', function(e) {
                    this._onParamClick(e);
                });
            }
        }
    }, {});
    provide(BEMDOM);
});