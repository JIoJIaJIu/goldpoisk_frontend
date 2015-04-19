modules.define('g-desires', ['i-bem__dom'], function(provide, BEMDOM) {

    BEMDOM.decl('g-desires', {
        onSetMod: {
            'js': {
                'inited': function () {
                    var desires = this;
                    var link = desires.findBlockInside('g-link');

                    link.bindTo('click', function (e) {
                        e.preventDefault();
                        //@TODO построение модала с желаемыми товарами
                    });
                },
                '': function () {

                }
            }
        }
    }, {});

    provide(BEMDOM);
})