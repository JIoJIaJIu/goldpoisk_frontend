// process.env.YENV = 'production';

var PATH = require('path');

MAKE.decl('Arch', {
    blocksLevelsRegexp : /^.+?\.blocks/,
    bundlesLevelsRegexp : /^.+?\.bundles$/,
    getLibraries: function () {
        return {
            'bem-core': {
                type: 'git',
                url: 'git@github.com:JIoJIaJIu/bem-core.git',
                treeish: 'v2'
            },
            'bem-social': {
                type: 'git',
                url: 'git@github.com:voischev/bem-social.git',
                treeish: 'master'
            },
            'bem-history': {
                type: 'git',
                url: 'git@github.com:bem/bem-history.git',
                treeish: 'v2'
            }
        }
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

            'vanilla.js',
            'browser.js',
            'browser.js+bemhtml'
        ];

    },

    getLevelsMap : function() {
        return {
            desktop : [
                'bem-core/common.blocks',
                'bem-core/desktop.blocks',
                'bem-social/common.blocks',
                'bem-social/desktop.blocks',
                'bem-history/common.blocks',
                'common.blocks',
                'lib.blocks',
                'min.blocks',
                'desktop.blocks'
            ]
        };
    }
});
