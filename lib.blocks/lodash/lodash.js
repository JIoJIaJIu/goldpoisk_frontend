modules.define('slider', ['loader_type_js'], function (provide, loader) {
    loader('http://goldpoisk.ru/js/third-parties/lodash.min.js', function () {
        provide(_);
    });
});
