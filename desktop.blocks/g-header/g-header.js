modules.define('g-header', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
    BEMDOM.decl('g-header', {
        onSetMod: {
            'js': function () {
                self = this;
                var support = this.findBlockInside('g-support');
                var desc = $('.g-logo__description');

                $(window).scroll(function(e) {
                    repos();
                });

                function repos () {
                    setTimeout(function () {
                        if ($(window).scrollTop() > 0) {
                            self.setMod('state', 'flow');
                            support.setMod('dark', true);
                            desc.css('display', 'none');
                        } else {
                            self.delMod('state');
                            support.delMod('dark');
                            desc.css('display', 'block');
                        }
                    });
                }

                repos();
            }
        }
    }, {});
    provide(BEMDOM);
});
