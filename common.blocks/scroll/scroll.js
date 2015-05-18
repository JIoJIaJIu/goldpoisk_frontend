modules.define('scroll', ['i-bem__dom', 'inherit', 'events'], function (provide, BEMDOM, inherit, events) {
    
    var scroll = inherit(events.Emitter, {
        __constructor: function () {console.log('init scroll')},
        init: function () {
            if (this._isInited)
                return;
            var self = this;
            this._inited = true;
            var prevTop = 0;
            this.scrollDefFn = function (e) {
                var currentTop = $(window).scrollTop();
                var diff = prevTop - currentTop;
                if (diff > 0) {
                    self.emit('scrollTop');
                } else if (diff < 0) {
                    self.emit('scrollBottom');
                } else if (diff == 0)
                    return;
                prevTop = currentTop;
                self.emit('scroll');
            }
            $(window).bind('scroll', this.scrollDefFn);
            this._isInited = true;
        },
        finalize: function () {
            $(window).unbind('scroll', this.scrollDefFn);
        },
        _isInited: false
    });

    provide(new scroll());
});