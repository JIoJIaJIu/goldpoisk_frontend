exports.getTechs = function () {
    var techs = {
        'bemjson.js': 'v2/bemjson.js',
        'bemdecl.js': 'v2/bemdecl.js',
        'deps.js' : 'v2/deps.js',
        'bemhtml': '../../bem-core/.bem/techs/bemhtml.js',

        'css': 'v2/css',
        'html': '../../bem-core/.bem/techs/html.js'
    }

    return techs;
}
/*
exports.baseLevelPath = require.resolve('../.bem/levels/bundles.js');
exports.baseLevelPath = require.resolve('../desktop.blocks');

exports.getTechs = function() {
    var techs = this.__base();

    return techs;
};

// Create bundles in bemjson.js tech
exports.defaultTechs = ['bemjson.js'];
*/
/*
exports.getTechs = function () {
    return {
        'css'           : 'v2/css',
        //'js'            : 'v2/js-i',
        'behtml.js': 'bemhtml.js',
        'deps.js': 'v2/deps.js',
        'bemdecl.js': 'v2/bemdecl.js',
        'bemjson': 'v2/bemjson.js'
    }
};
*/
exports.getConfig = function () {
    return {
        bundleBuildLevels: this.resolvePaths([
            '../../bem-core/common.blocks',
            '../../bem-core/desktop.blocks',
            '../../desktop.blocks'
        ])
    };
}
