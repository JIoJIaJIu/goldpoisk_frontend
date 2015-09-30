modules.define('g-item', ['i-bem__dom', 'router'], function(provide, BEMDOM, router) {
    BEMDOM.decl('g-item', {
        onSetMod: {
            js: {
                'inited': function () {
                    var url = this.params.url;
                    var heading = this.findBlockInside('g-heading');
                    this._blocks = {
                        desires: this.findBlockOutside('page').findBlockInside('g-desires')
                    }

                    heading.bindTo('click', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        router.route(url);
                    });

                    this._bindLike();
                },
                '': function () {
                    this._blocks.desires.un('change', this._checkLikeFn);
                    this._blocks = null;
                    this._checkLikeFn = null;
                }
            }
        },

        _bindLike: function () {
            var id = this.params.id;
            var desires = this._blocks.desires;
            var like = this.findBlockInside('g-like');

            this._checkLikeFn = function () {
                desires.isLiked(id) ? like.setMod('state', 'checked') : like.delMod('state');
            }

            like.on({modName: 'state', modVal: '*'}, function (e, obj) {
                !!obj.modVal ? desires.like(id) : desires.dislike(id);
            });

            desires.on('change', this._checkLikeFn);
            this._checkLikeFn();
        },

        _blocks: null,
        _checkLikeFn: null
    }, {});

    provide(BEMDOM);
});
