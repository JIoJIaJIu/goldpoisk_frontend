modules.define('scroll', ['i-bem__dom', 'inherit', 'events'], function (provide, BEMDOM, inherit, events) {
    
    var scroll = inherit(events.Emitter, {
        __constructor: function () {
            var self = this;
            var top = 0;

            $(window).bind('scroll', function (e) {
                var currentTop = $(window).scrollTop();
                var diff = top - currentTop;

                if (diff > 0) {
                    self.emit('scrollTop');
                } else if (diff < 0) {
                    self.emit('scrollBottom');
                } else if (diff == 0)
                    return;

                top = currentTop;
                self.emit('scroll');
            });
        }
    });

    provide(new scroll());
});