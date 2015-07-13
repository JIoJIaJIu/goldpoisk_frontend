modules.define('g-breadcrumbs', ['i-bem__dom', 'router'],
               function(provide, BEMDOM, router) {
    BEMDOM.decl('g-breadcrumbs', {
        onSetMod: {
            js: {
                'inited': function () {
                    var self = this;

                    this.bindTo('click', function (e) {
                        this._onCrumbsClick(e);
                    });
                },

                '': function () {
                    this.unbindFrom('click');
                }
            }
        },

        _onCrumbsClick: function (e) {
            e.stopPropagation();
            e.preventDefault();

            var params = this.elemParams($(e.target));

            router.route(params.url);
        }

    }, {});

    provide(BEMDOM);
});