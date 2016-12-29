(function () {
    'use strict';

    var gulp = require('gulp'),
        nodemon = require('gulp-nodemon'),
        config = require('config'),
        gulpConfig = require('../config');

    gulp.task('serve', ['build', 'inject', 'open'], function () {
        var options = {
            script: './src/server/index.js',
            delayTime: 1,
            env: {
                'PORT': config.port
            },
            watch: [gulpConfig.files.js, 'src/**/*.html']
        };

        return nodemon(options).on('restart', function () {
            console.log('Restarting...');
        });
    });
})();
