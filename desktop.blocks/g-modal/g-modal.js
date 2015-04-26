modules.define('g-modal', ['i-bem__dom', 'keyboard__codes'], function(provide, BEMDOM, key) {

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
            this.elem('window').css('top', top + 'px');

            var self = this;
            this._controlKeyFn = function (e) {
                if (e.keyCode === key.ESC)
                    self.hide();
            }

            this.bindToWin('keyup', this._controlKeyFn);
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
        },

        _controlKeyFn: null
    }, {});

    provide(BEMDOM);
})
