modules.define('g-goods', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
    BEMDOM.decl('g-goods', {
        onSetMod: {
            'js': function () {
                var self = this;
                $(window).scroll(function(e) {
                    var body = document.body;
                    if (body.scrollHeight - body.scrollTop - 352 <= 0) {
                        console.log('#');
                        BEMDOM.append(
                            self.domElem,
                            BEMHTML.apply({
                                block: 'g-product',
                                mods: { like: 'yes', action: 'yes' },
                                url: '#',
                                title: 'Золотое Кольцо с гранатами и фианитами. Очень красивое и неебически дорогое',
                                imageUrl: '../../desktop.blocks/g-goods/images/good.png',
                                weight: '4.5 грамм',
                                carat: '0,07 карат',
                                price: 1000000,
                                store: 'Sunlight',
                                storeUrl: '#'
                            })
                        );
                    }
                });
            }
        }
    }, {});
    provide(BEMDOM);
})