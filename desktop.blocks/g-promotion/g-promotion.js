modules.define('g-promotion', ['i-bem__dom'], function (provide, BEMDOM) {

BEMDOM.decl('g-promotion', {
    onSetMod: {
        js: function () {
            console.log('g-promotion');
        }
    }
}, {
});

provide(BEMDOM);

});
