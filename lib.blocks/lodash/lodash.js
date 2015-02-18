modules.define('slider', ['loader_type_js', 'config'], function (provide, loader, config) {
    loader(config.scripts.lodash, function () {
        provide(_);
    });
});
