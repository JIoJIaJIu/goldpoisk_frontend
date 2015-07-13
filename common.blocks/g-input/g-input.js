modules.define('g-input', ['i-bem__dom'], function (provide, BEMDOM) {

    BEMDOM.decl('g-input', {
        onSetMod: {
            js: {
                "inited": function () {
                    this.bindTo(this.elem('control'), 'input', this._onInput);
                },
                "": function () {

                }
            }
        },

        _onInput: function (e) {
            var data = {
                value: this.val() || 0
            }
            this.emit('change', data);
        },

        val: function () {
            return parseInt(this.elem('control').val());
        },

        focus: function () {
            this.elem('control').focus();
        },

        setVal: function (val) {
            this.elem('control').val(Math.round(val));
            this._onInput();
            return true;
        }

    }, {});

    provide(BEMDOM);
});
