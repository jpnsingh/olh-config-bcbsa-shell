'use strict';

var istanbul = require('browserify-istanbul');
var isparta = require('isparta');

module.exports = function (config) {
    config.set({
        basePath: '../',

        frameworks: [
            'browserify',
            'jasmine',
            'sinon'
        ],

        files: [
            // Libraries
            'libs/lodash.min.js',
            'libs/jquery.min.js',
            'libs/bootstrap.min.js',
            'libs/angular.min.js',
            'libs/angular-mocks.js',
            'libs/angular-strap.min.js',
            'libs/angular-ui-router.min.js',
            'libs/jasmine-mox-matchers.min.js',
            'node_modules/bardjs/dist/bard.js',
            'public/lib/ng-file-upload/ng-file-upload.js',
            'public/lib/angular-translate/angular-translate.js',
            'public/lib/angular-translate-loader-partial/angular-translate-loader-partial.js',

            // Sources
            'src/client/js/**/*.js',

            // Tests
            'test/client/spec/**/*.js',

            // Templates
            '.build/web/js/bcbsa-shell.tpl.js'
        ],

        exclude: [],

        preprocessors: {
            'src/client/js/**/*.js': ['browserify'],
            'test/client/spec/**/*.js': ['browserify']
        },

        reporters: [
            'progress',
            'coverage'
        ],

        coverageReporter: {
            reporters: [
                {type: 'text-summary'}
            ]
        },

        port: 8084,

        runnerPort: 9100,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['PhantomJS'],

        browserNoActivityTimeout: 10000,

        captureTimeout: 10000,

        singleRun: true,

        browserify: {
            debug: true,
            transform: [
                ['babelify', {presets: ['es2015']}],
                istanbul({
                    instrumenter: isparta,
                    ignore: ['**/node_modules/**', '**/test/**']
                })
            ]
        }
    });
};
