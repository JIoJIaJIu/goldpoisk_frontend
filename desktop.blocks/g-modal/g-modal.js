modules.define('g-modal', ['i-bem__dom'], function(provide, BEMDOM) {

    BEMDOM.decl('g-modal', {
        onSetMod: {
            js: {
                'inited': function () {
                    var self = this;
                    var close = self.findBlockInside({ block: 'g-button', modName: 'close', modVal: true });
                    close.bindTo('click', function (e) {
                        BEMDOM.destruct(self.domElem);
                    });
                    self.bindTo('click', function (e) {
                        BEMDOM.destruct(self.domElem);
                    });
                },
                '': function () {
                    this.unbindFrom('click');
                    this.findBlockInside({ block: 'g-button', modName: 'close', modVal: true }).unbindFrom('click');
                }
            }
        }
    }, {});

    provide(BEMDOM);
})