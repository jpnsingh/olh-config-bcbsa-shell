(function () {
    'use strict';

    var cfg = require('config');
    var build = {};
    build.root = '.build';
    build.webPath = build.root + '/web';
    build.transpiled = '.transpiled';

    module.exports = {
        module: cfg.app,
        files: {
            js: ['src/**/*.js']
        },
        inject: {
            src: './src/client/views/*.html',
            dest: './src/client/views',
            wiredep: {
                options: {
                    bowerJson: require('../bower.json'),
                    directory: './public/lib',
                    ignorePath: '../../public/'
                }
            },
            gulp: {
                src: {
                    css: './public/css/*.css',
                    js: './' + build.webPath + '/js/*.js'
                },
                options: {
                    ignorePath: ['/public/', '/.build/web']
                }
            }
        },
        paths: {
            test: './test',
            src: {
                js: './src/client/js/**/*.js',
                templates: './src/client/views/**/*.html',
                browserify: {
                    entry: './' + build.transpiled + '/app.js'
                }
            },
            dest: {
                root: build.root,
                js: build.webPath + '/js',
                templates: build.webPath + '/templates',
                transpiled: build.transpiled
            },
            publish: {
                src: build.root + '**/*',
                dest: '.publish'
            }
        }
    };
})();
