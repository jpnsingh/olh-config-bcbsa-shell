(function () {
    'use strict';

    module.exports = function (config) {
        config.set({
            basePath: '../',

            frameworks: [
                'browserify',
                'mocha',
                'chai'
            ],

            files: [
                // Libraries
                'libs/lodash.min.js',
                'libs/jquery.min.js',
                'libs/angular.min.js',
                'libs/angular-mocks.js',
                'libs/angular-strap.min.js',
                'libs/angular-ui-router.min.js',
                // 'libs/jasmine-mox-matchers.min.js',
                'node_modules/bardjs/dist/bard.js',

                // Sources
                'src/client/js/**/*.js',

                // Tests
                'test/client/spec/js/**/*.js',

                {pattern: 'src/client/views/**/*.html', included: false, served: true}
            ],

            exclude: [],

            preprocessors: {
                'src/client/js/**/*.js': ['browserify'],
                'test/client/spec/js/**/*.js': ['browserify']
            },

            reporters: [
                'dots'
            ],

            port: 8084,

            runnerPort: 9100,

            colors: true,

            // logLevel: config.LOG_INFO,

            autoWatch: false,

            // browsers: ['Chrome'],
            browsers: ['PhantomJS'],

            proxies: {
                '/olh-config-bcbsa-shell': 'http://localhost:8084/base'
            },

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
