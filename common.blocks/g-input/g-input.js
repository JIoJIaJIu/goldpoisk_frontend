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
            this.emit('change', this.val());
        },

        val: function () {
            return parseInt(this.elem('control').val()) || 0;
        },

        focus: function () {
            this.elem('control').focus();
        },

        setVal: function (val) {
            val = Math.round(val);
            this.elem('control').val(val);
            this._onInput();
            return true;
        }

    }, {});

    provide(BEMDOM);
});
