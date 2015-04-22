modules.define('g-desires', ['i-bem__dom', 'cookie'], function(provide, BEMDOM, cookie) {

    BEMDOM.decl('g-desires', {
        onSetMod: {
            js: {
                'inited': function () {
                    var self = this;
                    var link = self.findBlockInside('g-link');
                    var desires = cookie.get('desires') || '';
                    desires = _.words(desires);
                    this._list = _.map(desires, function(desire) {
                        return parseInt(desire, 10);
                    });
                    if (this._list.length) {
                        if (this.hasMod('empty'))
                            delMod('empty');
                        this.recount();
                    } else {
                        this.setMod('empty', true);
                        this.elem('count').text('');
                        this.elem('text').text('Нет товаров');
                    }

                    link.bindTo('click', function (e) {
                        e.preventDefault();
                        var header = self.findBlockOutside('g-header');
                        var content = {
                            block: 'g-modal',
                            content: [{
                                block: 'g-heading',
                                mods: { dark: true, size: 'l' },
                                count: 11,
                                content: 'Список желаний'
                            }, {
                                block: 'g-description',
                                tag: 'p',
                                content: 'Понравившиеся вам товары хранятся здесь, и ждут когда вы их купите. Мы пришлем вам весточку, если на выбранные товары появятся скидки.'
                            }, {
                                block: 'g-goods',
                                content: [{
                                    block: 'g-product',
                                    mods: { like: true, action: true },
                                    url: '#',
                                    title: 'Золотое Кольцо с гранатами и фианитами. Очень красивое и неебически дорогое',
                                    imageUrl: '../../desktop.blocks/g-goods/images/good.png',
                                    weight: '4.5 грамм',
                                    carat: '0,07 карат',
                                    price: 1000000,
                                    store: 'Sunlight',
                                    storeUrl: '#'
                                }, {
                                    block: 'g-product',
                                    mods: { like: true, hit: true },
                                    url: '#',
                                    title: 'Золотое Кольцо с гранатами и фианитами. Очень красивое и неебически дорогое',
                                    imageUrl: '../../desktop.blocks/g-goods/images/good.png',
                                    weight: '4.5 грамм',
                                    carat: '0,07 карат',
                                    price: 1000000,
                                    store: 'Sunlight',
                                    storeUrl: '#'
                                }, {
                                    block: 'g-product',
                                    url: '#',
                                    title: 'Золотое Кольцо с гранатами и фианитами. Очень красивое и неебически дорогое',
                                    imageUrl: '../../desktop.blocks/g-goods/images/good.png',
                                    weight: '4.5 грамм',
                                    carat: '0,07 карат',
                                    price: 1000000,
                                    store: 'Sunlight',
                                    storeUrl: '#'
                                }, {
                                    block: 'g-product',
                                    mods: { like: false, action: true },
                                    url: '#',
                                    title: 'Золотое Кольцо с гранатами и фианитами. Очень красивое и неебически дорогое',
                                    imageUrl: '../../desktop.blocks/g-goods/images/good.png',
                                    weight: '4.5 грамм',
                                    carat: '0,07 карат',
                                    price: 1000000,
                                    store: 'Sunlight',
                                    storeUrl: '#'
                                }]
                            }]
                        };
                        BEMDOM.before(
                            header.domElem,
                            BEMHTML.apply(content)
                        );
                    });
                },
                '': function () {
                    this.findBlockInside('g-link').unbindFrom('click');
                }
            }
        },
        like: function (id) {
            this._list.push(id);
            if (this.hasMod('empty'))
                this.delMod('empty');
            this.recount();

            cookie.set('desires', this._list.join('.'), {expires: 1});
        },
        dislike: function (id) {
            _.remove(this._list, function(i) {
                return i == id;
            });
            if (this._list.length) {
                this.recount();
            } else {
                this.setMod('empty', true);
                this.elem('count').text('');
                this.elem('text').text('Нет товаров');
            }

            cookie.set('desires', this._list.join('.'), {expires: 1});
        },
        isLiked: function (id) {
            return !!~this._list.indexOf(id);
        },
        recount: function () {
            var count = this.elem('count');
            var text = this.elem('text');
            text.text(' ' + declension(this._list.length, 'товар'));
            count.text(this._list.length);
        },
        _list: null,
    }, {});

    provide(BEMDOM);
})