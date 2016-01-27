modules.define('g-input', ['i-bem__dom'], function (provide, BEMDOM) {

    BEMDOM.decl('g-input', {
        onSetMod: {
            js: {
                "inited": function () {
                    this.bindTo(this.elem('control'), 'input', _.debounce(this._onInput, 1000));
                },

                "": function () {}
            }
        },

        getVal: function () {
            return parseInt(this.elem('control').val(), 10) || 0;
        },

        setVal: function (val) {
            val = Math.round(val);
            this.elem('control').val(val);
            this._onInput();
            return true;
        },

        focus: function () {
            this.elem('control').focus();
        },

        _onInput: function (e) {
            this.emit('change', this.getVal());
        }

    }, {});

    provide(BEMDOM);
});
