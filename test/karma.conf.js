(function () {
    'use strict';

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
                'libs/angular.min.js',
                'libs/angular-mocks.js',
                'libs/angular-strap.min.js',
                'libs/angular-ui-router.min.js',
                'libs/jasmine-mox-matchers.min.js',
                'node_modules/bardjs/dist/bard.js',

                // Sources
                'src/client/js/**/*.js',

                // Tests
                'test/client/spec/js/**/*.js',

                'src/client/views/**/*.html',

                // {pattern: 'src/client/views/**/*.html', included: false, served: true}
            ],

            exclude: [],

            preprocessors: {
                'src/client/js/**/*.js': ['browserify'],
                'test/client/spec/js/**/*.js': ['browserify'],
                'src/client/views/**/*.html': ['ng-html2js']
            },

            ngHtml2JsPreprocessor: {
                // If your build process changes the path to your templates,
                // use stripPrefix and prependPrefix to adjust it.
                // stripPrefix: ".build/web/",
                // prependPrefix: ".build/web/",

                // the name of the Angular module to create
                moduleName: "bcbsa-shell-templates"
            },

            reporters: [
                'dots'
            ],

            port: 8084,

            runnerPort: 9100,

            colors: true,

            // logLevel: config.LOG_INFO,

            autoWatch: false,

            browsers: ['PhantomJS'],

            proxies: {
                '/': 'http://localhost:8084/'
            },

            urlRoot: '/_karma_/',

            browserNoActivityTimeout: 10000,

            captureTimeout: 10000,

            singleRun: true,

            browserify: {
                debug: true,
                transform: ['babelify']
            }
        });
    };
})();
