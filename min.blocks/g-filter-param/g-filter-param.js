modules.define('g-filter-param', ['i-bem__dom', 'jquery', 'logger'], function(provide, BEMDOM, $, logger) {
    BEMDOM.decl({block: 'g-filter-param', modName: 'list'}, {
        onSetMod: {
            js: {
                'inited': function () {
                    var self = this;
                    this._params = [];
                    this._logger = logger.Logger('g-filter-param #' + this.params.type).init();

                    this.bindTo(this.elem('title_arrow'), 'click', function(e) {
                        this._onParamClick(e);
                    });

                    this.bindTo(this.elem('title_text'), 'click', function(e) {
                        this._onParamClick(e);
                    });

                    _.forEach(this.findBlocksInside('g-checkbox'), function (item) {
                        item.on({modName: 'checked', modVal: '*'}, function (e, obj) {
                            var id = this.params.ident;
                            !!obj.modVal ? self._addParam(id) : self._delParam(id);

                        })
                    });
                },
                '': function () {
                    this.unbindFrom(this.elem('title_arrow'), 'click');
                    this.unbindFrom(this.elem('title_text'), 'click');

                    this._logger.finalize();
                    this._logger = null;
                }
            }
        },

        _addParam: function (id) {
            this._logger.debug('Add param', id);
            if (_.find(this._params, id))
                return;

            this._params.push(id);
            this.emit('changed', {
                type: this.params.type,
                ids: this._params
            });
        },

        _delParam: function (id) {
            this._logger.debug('Remove param', id);
            var index = this._params.indexOf(id);
            if (!~index)
                return;

            _.remove(this._params, id);
            this.emit('changed', {
                type: this.params.type,
                ids: this._params
            });
        },

        _onParamClick: function (e) {
            var _target = $(e.currentTarget);
            this.toggleMod('state', 'opened', 'closed');
        },

        _params: []
    }, {});
    provide(BEMDOM);
});
