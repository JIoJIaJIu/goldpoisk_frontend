modules.define('g-desires', ['i-bem__dom', 'cookie'], function(provide, BEMDOM, cookie) {

    BEMDOM.decl('g-desires', {
        onSetMod: {
            js: {
                'inited': function () {
                    var self = this;
                    var link = this.findBlockInside('g-link');
                    var desires = cookie.get('desires') || '';
                    desires = _.words(desires);
                    this._list = _.map(desires, function(desire) {
                        return parseInt(desire, 10);
                    });

                    this._redraw();

                    link.bindTo('click', function (e) {
                        e.preventDefault();
                        var header = self.findBlockOutside('g-header');
                        $.getJSON('/sortparam', self._list.join('.'), function success(data) {
                            var products = blocks['g-goods.items'](data);
                            var content = {
                                block: 'g-modal',
                                content: [{
                                    block: 'g-heading',
                                    mods: { dark: true, size: 'l' },
                                    count: self._list.length,
                                    content: 'Список желаний'
                                }, {
                                    block: 'g-description',
                                    tag: 'p',
                                    content: 'Понравившиеся вам товары хранятся здесь, и ждут когда вы их купите. Мы пришлем вам весточку, если на выбранные товары появятся скидки.'
                                }, {
                                    block: 'g-goods',
                                    content: [
                                        products
                                    ]
                                }]
                            };
                            BEMDOM.before(
                                header.domElem,
                                BEMHTML.apply(content)
                            );
                        });
                    });
                },
                '': function () {
                    this.findBlockInside('g-link').unbindFrom('click');
                }
            }
        },

        _list: null,

        like: function (id) {
            this._list.push(id);
            this._redraw();

            cookie.set('desires', this._list.join('.'), {expires: 1});
        },

        dislike: function (id) {
            _.remove(this._list, function(i) {
              return id == i;
            });

            this._redraw();

            cookie.set('desires', this._list.join('.'), {expires: 1});
        },

        isLiked: function (id) {
            return !!~this._list.indexOf(id);
        },

        _redraw: function () {
            var count = this.elem('count');
            var text = this.elem('text');
            if (this._list.length) {
                this.delMod('empty');
                count.text(this._list.length);
                text.text(' ' + declension(this._list.length, 'товар'));
            } else {
                this.setMod('empty', true);
                count.text('');
                text.text('Нет товаров');
            }
            return;
        }
    }, {});

    provide(BEMDOM);
})