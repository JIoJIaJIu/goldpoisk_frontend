modules.define('g-gallery', ['i-bem__dom', 'jquery'], function (provide, BEMDOM, $) {

    BEMDOM.decl('g-gallery', {
        onSetMod: {
            js: function () {
                this.bindTo(this.elem('dimmer'), 'click', function (e) {
                    this.delMod('showed');
                });

                var slider = new $JssorSlider$(this.elem('jssor-container')[0], {
                    $ArrowKeyNavigation: true,
                    $StartIndex: this.params.index
                });
            }
        }

    }, {});

    provide(BEMDOM);
});
