#!/usr/bin/env node

var Q = require('q');
var B = require('bem');
var BEM = B.api;

var levels = [
    'bem-core/common.blocks',
    'bem-core/desktop.blocks',
    'common.blocks',
    'lib.blocks',
    'min.blocks',
    'desktop.blocks'
];

var techs = [
    'node_modules/bem/lib/techs/v2/css.js',
    '.bem/techs/priv.js.js',
    './bem-core/.bem/techs/bemhtml.js',
    'bem-core/.bem/techs/vanilla.js.js',
    'bem-core/.bem/techs/browser.js.js',
    'bem-core/.bem/techs/browser.js+bemhtml.js'
];

console.log('tech:', techs.join('\ntech: '));

var promise = BEM.build({
        outputDir: 'merge',
        outputName: 'index',
        outputLevel: B.createLevel('desktop.bundles/'),
        declaration: 'desktop.bundles/merge/merge.deps.js',
        level: levels,
        tech: techs
    });

Q.when(promise, function () {
        console.log('finished');
    }, function (error) {
        console.log('error', error);
    }
);
