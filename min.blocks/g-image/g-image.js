modules.define('g-image', ['i-bem__dom'], function(provide, BEMDOM) {
    
    BEMDOM.decl('g-image', {
        onSetMod: {
            js: {
                'inited': function () {
                    var self = this;
                    this.bindTo('main', 'load', function (e) {
                        self.setMod('done', true);
                    });
                },
                '': function () {
                    this.unbindFrom('main', 'load');
                }
            }
        }
    }, {});

    provide(BEMDOM);
})