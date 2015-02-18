modules.define('slider', ['loader_type_js', 'jquery'], function (provide, loader) {
    //TODO:move to config
    loader('http://goldpoisk.ru/js/third-parties/jssor.slider.min.js', function () {
        provide($JssorSlider$);
    });
});
