(function () {
    'use strict';

    var config = require('config');
    var build = {};
    build.root = '.build';
    build.webPath = build.root + '/web';
    build.transpiled = '.transpiled';

    module.exports = {
        module: config.app,
        files: {
            js: ['src/**/*.js']
        },
        inject: {
            src: './src/client/views/*.html',
            dest: './src/client/views',
            wiredep: {
                options: {
                    bowerJson: require('../bower.json'),
                    directory: './' + build.webPath + '/libs',
                    ignorePath: '../../' + build.webPath + '/'
                }
            },
            gulp: {
                src: {
                    css: './' + build.webPath + '/styles/css/*.css',
                    js: './' + build.webPath + '/js/*.js'
                },
                options: {
                    ignorePath: ['/public/', '/.build/web/']
                }
            }
        },
        paths: {
            test: './test',
            src: {
                js: './src/client/js/**/*.js',
                libs: ['public/lib/**/*', 'libs/**/*'],
                styles: './src/client/styles/**/*',
                templates: './src/client/views/**/*.html',
                browserify: {
                    entry: './' + build.transpiled + '/app.js'
                }
            },
            dest: {
                root: build.root,
                js: build.webPath + '/js',
                libs: build.webPath + '/libs',
                styles: build.webPath + '/styles',
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
