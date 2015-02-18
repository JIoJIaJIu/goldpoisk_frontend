modules.define('slider', ['loader_type_js', 'config', 'jquery'], function (provide, loader, config) {
    loader(config.scripts.slider, function () {
        provide($JssorSlider$);
    });
});
