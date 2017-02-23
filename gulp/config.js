(function () {
    'use strict';

    var config = require('config'),
        build = {};

    build.root = '.build';
    build.webPath = build.root + '/web';
    build.transpiled = '.transpiled';

    module.exports = gulpConfig();

    function gulpConfig() {
        return {
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
                    i18n: './src/client/i18n/' + config.app + '.*.json',
                    js: './src/client/js/**/*.js',
                    libs: ['public/lib/**/*', 'libs/**/*'],
                    images: 'images/**/*',
                    styles: ['./src/client/styles/**/*', '!src/client/styles/{less,less/**}'],
                    less: './src/client/styles/less/**/*.less',
                    templates: './src/client/views/**/*.html',
                    browserify: {
                        entry: './' + build.transpiled + '/app.js'
                    }
                },
                dest: {
                    root: build.root,
                    i18n: build.webPath + '/i18n',
                    js: build.webPath + '/js',
                    libs: build.webPath + '/libs',
                    images: build.webPath + '/images',
                    styles: build.webPath + '/styles',
                    css: build.webPath + '/styles/css',
                    templates: build.webPath + '/templates',
                    transpiled: build.transpiled
                },
                publish: {
                    src: build.root + '**/*',
                    dest: '.publish'
                }
            },
            nodemon: {
                options: {
                    script: './src/server/index.js',
                    watch: 'src',
                    ext: 'js html css less',
                    ignore: [
                        'src/client/views/404.html',
                        'src/client/views/500.html',
                        'src/client/views/index.html'
                    ],
                    tasks: ['build'],
                    delayTime: 1000,
                    env: {
                        'PROTOCOL': config.web.PROTOCOL,
                        'HOST': config.web.HOST,
                        'PORT': config.web.PORT,
                        'SECRET': config.SECRET
                    }
                }
            }
        };
    }
})();
