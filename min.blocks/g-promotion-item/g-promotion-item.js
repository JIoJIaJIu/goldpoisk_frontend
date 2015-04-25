modules.define('g-promotion-item', ['i-bem__dom', 'router'], function (provide, BEMDOM, router) {
    BEMDOM.decl('g-promotion-item', {
        onSetMod: {
            js: {
                'inited': function () {
                    var url = this.elemParams('title').url;

                    this.bindTo(this.elem('title'), 'click', function (e) {
                        e.preventDefault();
                        router.route(url);
                    });

                    this.domElem.css({
                        left: this.params.left + 'px',
                        top: this.params.top + 'px'
                    })
                }
            }
        }
    }, {});

    provide(BEMDOM);
});
