modules.define('g-header', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
    BEMDOM.decl('g-header', {
        onSetMod: {
            'js': function () {
                self = this;
                var support = this.findBlockInside('g-support');
                var desc = $('.g-logo__description');
                if ($(window).scrollTop() > 0) {
                    self.setMod('state', 'flow');
                    desc.css('display', 'none');
                } else {
                    self.delMod('state');
                    desc.css('display', 'block');
                }
                $(window).scroll(function(e) {
                    desc.css('display', 'block');
                    if ($(this).scrollTop() > 0) {
                        self.setMod('state', 'flow');
                        support.setMod('dark', true);
                    } else {
                        self.delMod('state');
                        support.delMod('dark');
                    }                    
                });
            }
        }
    }, {});
    provide(BEMDOM);
});