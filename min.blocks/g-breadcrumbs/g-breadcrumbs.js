modules.define('g-breadcrumbs', ['i-bem__dom', 'router'],
               function(provide, BEMDOM, router) {
    BEMDOM.decl('g-breadcrumbs', {
        onSetMod: {
            js: {
                'inited': function () {
                    var self = this;
                    this._rootNode = this.findBlockInside('g-breadcrumbs__root-node');
                    this._levelNodes = this.findBlocksInside('g-breadcrumbs__top-level-node');

                    this._rootNode.bindTo('click', { partUrl: this._rootNode.params.url }, this._onNodeClick);
                    _.forEach(this._levelNodes, function (part) {
                        if (part.params.url)
                            part.bindTo('click', function (e) {
                                e.stopPropagation();
                                e.preventDefault();
                                router.route(part.params.url);
                            });
                    });
                },

                '': function () {
                    this._rootNode.unbindFrom('click', this._onNodeClick);
                    _.forEach(this._levelNodes, function (part) {
                        part.unbindFrom('click');
                    });
                }
            }
        },

        _onNodeClick: function (e) {
            e.stopPropagation();
            e.preventDefault();
            router.route(e.data.partUrl);
        }

    }, {});

    provide(BEMDOM);
});