// process.env.YENV = 'production';

var PATH = require('path');

MAKE.decl('Arch', {
    blocksLevelsRegexp : /^.+?\.blocks/,
    bundlesLevelsRegexp : /^.+?\.bundles$/,
    getLibraries: function () {
        return [
            {
                'bem-core': {
                    type: 'git',
                    url: 'git@github.com:JIoJIaJIu/bem-core.git',
                    treeish: 'v2'
                }
            }, {
                'bem-social': {
                    type: 'git',
                    url: 'git@github.com:YLeight/bem-social.git',
                    treeish: 'master'
                }
            }
        ]
    }

});


MAKE.decl('BundleNode', {

    getTechs : function() {

        return [
            'bemjson.js',
            'bemdecl.js',
            'deps.js',
            'bemhtml',

            'css',
            'html',
            'priv.js',

            'js',
            'vanilla.js',
            'browser.js',
            'browser.js+bemhtml.js'
        ];

    },

    getLevelsMap : function() {
        return {
            desktop : [
                'bem-core/common.blocks',
                'bem-core/desktop.blocks',
                'lib.blocks',
                'min.blocks',
                'desktop.blocks'
            ]
        };
    }
});
