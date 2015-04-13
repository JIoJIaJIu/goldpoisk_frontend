modules.define('g-header', ['i-bem__dom', 'jquery', 'router'], function(provide, BEMDOM, $, router) {
    BEMDOM.decl('g-header', {
        onSetMod: {
            js: {
                'inited': function () {
                    $.easing["easeInExpo"] = function (x, t, b, c, d) {
                        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
                    }
                    $.easing["easeInQuart"] = function (x, t, b, c, d) {
                        return c*(t/=d)*t*t*t + b;
                    }
                    var inner = this.findBlockInside('g-header_inner');
                    inner.bindTo('up', 'click', function(e) {
                        $("body,html").animate({scrollTop: 0}, 750, 'easeInQuart');
                    });
                    this.enable();
                },

                '': function () {
                    this.disable();
                }
            }
        },

        enable: function () {
            if (this._enabled)
                return;

            if (router.getPath() === '/')
                return;

            this._enabled = true;
            var self = this;

            $(window).scroll(repos);
            repos();

            function repos () {
                setTimeout(function () {
                    if ($(window).scrollTop() > 0) {
                        self._flow()
                    } else {
                        self._unflow();
                    }
                });
            }
        },

        disable: function () {
            if (!this._enabled)
                return;

            $(window).unbind('scroll');
            this._unflow();
            this._enabled = false;
        },

        _flow: function () {
            if (this.hasMod('state'))
                return;

            this.setMod('state', 'flow');
            this.findBlockInside('g-support').setMod('dark', true);
            $('.g-header_inner__up').css('display', 'block');
        },

        _unflow: function () {
            if (!this.hasMod('state'))
                return;

            this.delMod('state');
            this.findBlockInside('g-support').delMod('dark');
            $('.g-header_inner__up').css('display', 'none');
        },

        _enabled: false
    }, {});
    provide(BEMDOM);
});
