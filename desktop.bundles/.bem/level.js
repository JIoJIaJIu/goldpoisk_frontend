exports.getTechs = function () {
    var techs = {
        'bemjson.js': 'v2/bemjson.js',
        'bemdecl.js': 'v2/bemdecl.js',
        'deps.js' : 'v2/deps.js',
        'bemhtml': '../../bem-core/.bem/techs/bemhtml.js',

        'css': 'v2/css',
        'html': '../../bem-core/.bem/techs/html.js',
        'priv.js': '../../.bem/techs/priv.js.js',

        //js
        'js': 'v2/js',
        'vanilla.js': '../../bem-core/.bem/techs/vanilla.js.js',
        'browser.js': '../../bem-core/.bem/techs/browser.js.js',
        'browser.js+bemhtml': '../../bem-core/.bem/techs/browser.js+bemhtml.js'
    }

    return techs;
}

exports.getConfig = function () {
    return {
        bundleBuildLevels: this.resolvePaths([
            '../../bem-core/common.blocks',
            '../../bem-core/desktop.blocks',
            '../../min.blocks',
            '../../desktop.blocks'
        ])
    };
}
