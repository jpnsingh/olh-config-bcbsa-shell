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
                'port': config.web.port,
                'host': config.web.host
            },
            watch: gulpConfig.files.js
        };

        return nodemon(options).on('restart', function () {
            console.log('Restarting...');
        });
    });
})();
