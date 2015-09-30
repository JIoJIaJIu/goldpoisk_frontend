modules.define('g-image', ['i-bem__dom'], function(provide, BEMDOM) {

    BEMDOM.decl({block: 'g-image', modName: 'preload'}, {
        onSetMod: {
            js: {
                'inited': function () {
                    var img = this.elem('picture')[0];
                    if (img.complete)
                        return;

                    this.setMod('loading', true);
                    this.bindTo('picture', 'load', function (e) {
                        this.delMod('loading');
                        this.unbindFrom('picture', 'load');
                    });
                },

                '': function () {
                    this.unbindFrom('picture', 'load');
                }
            }
        }
    }, {});

    BEMDOM.decl({block: 'g-image', modName: 'spin'}, {
        onSetMod: {
            js: {
                'inited': function () {
                    var spin = this.findBlockInside('g-spin');

                    this.bindTo('main', 'load', function () {
                        this.unbindFrom('main', 'load');
                        spin.delMod('visible');
                        this.setMod('loaded');
                        this.emit('load');
                    });

                    // hack
                    var img = this.elem('main');
                    var src = img.attr('src');
                    img.attr('src', null);
                    setTimeout(function () {
                        img.attr('src', src);
                    });
                },

                '': function () {
                    this.unbindFrom('main', 'load');
                }
            }
        }
    }, {});

    provide(BEMDOM);
})
