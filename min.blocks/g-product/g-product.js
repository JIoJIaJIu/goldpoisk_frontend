modules.define('g-product', ['i-bem__dom'], function (provide, BEMDOM) {

BEMDOM.decl('g-product', {
    onSetMod: {
        js: function () {
            var expanded = this.__self.getExpanded(this);
            var that = this;
            var params = this.params;
            var elem = this.domElem;

            this.bindTo('click', function (e) {
                e.preventDefault();
                expanded.show(that.domElem);
                var html = blocks['g-item']({
                    title: params.title,
                    features: params.features,
                    gallery: {
                        images: params.images,
                        mainImg: params.images[0]
                    }
                });
                //BEMDOM.update(expanded.domElem, BEMHTML.apply(html));
            });
        }
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
