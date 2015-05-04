modules.define('g-modal', ['i-bem__dom', 'keyboard__codes', 'router'], function(provide, BEMDOM, key, router) {

    var PADDING = 70;

    BEMDOM.decl('g-modal', {
        onSetMod: {
            js: {
                'inited': function () {
                    var close = this.findBlockInside({ block: 'g-button', modName: 'close', modVal: true });
                    close.bindTo('click', _.callback(this.hide, this));
                    this.bindTo('dimmer', 'click', _.callback(this.hide, this));
                },

                '': function () {
                    this.unbindFrom('click');
                    this.findBlockInside({ block: 'g-button', modName: 'close', modVal: true }).unbindFrom('click');
                }
            }
        },

        show: function (loading) {
            if (loading)
                this.setMod('loading');

            this.setMod('showed');
            var top = $(window).scrollTop();
            this.domElem.css('padding-top', top +/* + PADDING + */'px');

            var self = this;
            this._controlKeyFn = function (e) {
                if (e.keyCode === key.ESC)
                    self.hide();
            }

            this.bindToWin('keyup', this._controlKeyFn);

            this._routerChangeFn = function () {
                self.hide();
            }
            router.on('change', this._routerChangeFn);
            this._lockScroll();
        },

        update: function (html) {
            this.delMod('loading');

            var content = this.findBlockInside('g-content');
            BEMDOM.update(content.domElem, html);
        },

        hide: function () {
            this.delMod('showed');
            this.delMod('loading');
            this.unbindFrom('keyup', this._controlKeyFn);
            router.un('change', this._routerChangeFn);
            this._unlockScroll();
        },

        _lockScroll: function () {
            var elem = this.elem('window');
            var offsetTop = elem.offset().top;
            var top = offsetTop - PADDING

            this._lockScrollFn = function () {
                var scrollTop = $(window).scrollTop();

                if (scrollTop < top) {
                    window.scrollTo(0, top);
                    return;
                }
                var bottom = offsetTop + elem.outerHeight() - $(window).height() + PADDING;
                if (scrollTop > bottom) {
                    window.scrollTo(0, bottom);
                }
            };

            this.bindToWin('scroll', this._lockScrollFn);
        },

        _unlockScroll: function () {
            this.unbindFromWin('scroll', this._lockScrollFn);
        },

        _controlKeyFn: null,
        _routerChangeFn: null
    }, {});

    provide(BEMDOM);
})
