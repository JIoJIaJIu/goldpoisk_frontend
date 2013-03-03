"use strict";

MAKE.decl('Arch', {

    getLibraries: function () {
        return (process.env.LOAD_LIBS) ?
            {
                'bem-bl': {
                    type: 'git',
                    url: 'git://github.com/bem/bem-bl.git',
                    treeish: '0.3'
                }
            } :
            {};
    }

});

MAKE.decl('BundleNode', {
    
    getTechs: function () {
        return [
            'bemjson.js',
            'bemdecl.js',
            'deps.js',
            'bemhtml',
            'js',
            'css',
            'ie.css',
            'html'
        ]
    }

});
