modules.define('g-pagination', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
    BEMDOM.decl('g-pagination', {
        onSetMod: {
            'js': function () {
                var body = document.body;
                var spin = $(".g-spin");
                $(window).scroll(function(e) {
                    if (body.scrollHeight - body.scrollTop - $(window).height() <= 0)
                        spin.css("display", "inline-block");
                });
            }
        }
    }, {});
    provide(BEMDOM);
})