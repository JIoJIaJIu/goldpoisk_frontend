modules.define('g-modal', ['i-bem__dom'], function(provide, BEMDOM) {

    BEMDOM.decl('g-modal', {
        onSetMod: {
            js: {
                'inited': function () {
                    var modal = this;
                    var close = modal.findBlockInside({ block: 'g-button', modName: 'close', modVal: true });
                    close.bindTo('click', function (e) {
                        BEMDOM.destruct(modal.domElem);
                    });
                    modal.bindTo('click', function (e) {
                        BEMDOM.destruct(modal.domElem);
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