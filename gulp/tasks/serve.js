(function () {
    'use strict';

    var gulp = require('gulp'),
        nodemon = require('gulp-nodemon'),
        config = require('config'),
        gulpConfig = require('../config'),
        runSequence = require('run-sequence');

    module.exports = gulp.task('serve', function (callback) {
        runSequence(
            'build',
            'inject',
            callback
        );

        var options = {
            script: './src/server/index.js',
            delayTime: 1,
            env: {
                'PROTOCOL': config.web.PROTOCOL,
                'HOST': config.web.HOST,
                'PORT': config.web.PORT,
                'SECRET': config.SECRET
            },
            watch: gulpConfig.files.js
        };

        return nodemon(options).on('restart', function () {
            console.log('Restarting...');
        });
    });
})();
