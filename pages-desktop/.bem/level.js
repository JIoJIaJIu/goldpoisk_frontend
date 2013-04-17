"use strict";

var extend = require('bem/lib/util').extend;
var PATH = require('path');

var PRJ_PATH = '../..';
var BEMBL_TECH_PATH = 'bem-bl/blocks-common/i-bem/bem/techs';

exports.getTechs = function () {

    return {
        'bemjson.js' : '',
        'bemdecl.js' : 'bemdecl.js',
        'decl.js' : 'decl.js',
        'deps.js' : 'deps.js',
        'js' : 'js',
        'css' : 'css',
        'ie.css' : 'ie.css',
        'bemhtml' : PATH.join(PRJ_PATH, BEMBL_TECH_PATH, 'bemhtml.js'),
        'html' : PATH.join(PRJ_PATH, BEMBL_TECH_PATH, 'html.js')
    };

};

exports.getConfig = function() {

    return extend({}, this.__base() || {}, {

        bundleBuildLevels: this.resolvePaths([
            PATH.join(PRJ_PATH, 'bem-bl/blocks-common'),
            PATH.join(PRJ_PATH, 'bem-bl/blocks-desktop'),
            PATH.join(PRJ_PATH, 'blocks-desktop')
        ])

    });

};
