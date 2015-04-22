modules.define('g-desires', ['i-bem__dom', 'cookie'], function(provide, BEMDOM, cookie) {

    BEMDOM.decl('g-desires', {
        onSetMod: {
            js: {
                'inited': function () {
                    var self = this;
                    var link = self.findBlockInside('g-link');

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
            var desires = cookie.get('desires') || '';
            desires = _.words(desires);
            var ids = _.map(desires, function(desire) {
                return parseInt(desire, 10);
            });

            ids.push(id);

            cookie.set('desires', ids.join('.'), {expires: 1});
        },
        dislike: function (id) {
            var desires = cookie.get('desires') || '';
            desires = _.words(desires);
            ids = _.map(desires, function(desire) {
                return parseInt(desire, 10);
            });

            _.remove(ids, function(i) {
                return i == id;
            });

            cookie.set('desires', ids.join('.'), {expires: 1});
        }
    }, {});

    provide(BEMDOM);
})