(function () {
    'use strict';

    var cfg = require('config');
    var build = {
        root: '.build',
        transpiled: '.transpiled'
    };

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
                    js: './.build/' + cfg.app + '/js/*.js'
                },
                options: {
                    ignorePath: ['/public/', '/.build/']
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
                js: build.root + '/' + cfg.app + '/js',
                templates: build.root + '/templates',
                transpiled: build.transpiled
            },
            publish: {
                src: build.root + '**/*',
                dest: '.publish'
            }
        }
    };
})();
