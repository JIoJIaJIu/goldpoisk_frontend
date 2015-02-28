modules.define('g-product', ['i-bem__dom'], function (provide, BEMDOM) {

BEMDOM.decl('g-product', {
    onSetMod: {
        js: function () {
            var expanded = this.__self.getExpanded(this);
            var that = this;

            this.bindTo('click', function (e) {
                e.preventDefault();
                if (expanded.hasMod('showed')) {
                    that._hideExpanded(expanded);
                    return;
                }

                that._showExpanded(expanded);
            });
        }
    },

    //TODO: move to static
    _showExpanded: function (expanded) {
        var params = this.params;
        expanded.show(this.domElem);
        var html = blocks['g-item']({
            title: params.title,
            features: params.features,
            item: params.item,
            gallery: {
                images: params.images,
                mainImg: params.images[0]
            }
        });
        BEMDOM.update(expanded.domElem, BEMHTML.apply(html));
    },

    //TODO: move to static
    _hideExpanded: function (expanded) {
        expanded.setMod('showed', false);
    }
}, {
    getExpanded: function (obj) {
        if (this.__self.expanded)
            return this.__self.expanded;

        var html = BEMHTML.apply({
            block: 'g-expanded-item'
        });

        var dom = BEMDOM.after(obj.domElem, html);
        this.__self.expanded = obj.findBlockOn(dom, 'g-expanded-item');
        return this.__self.expanded;
    }
});

provide(BEMDOM);

});
