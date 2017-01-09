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
                'protocol': config.web.protocol,
                'host': config.web.host,
                'port': config.web.port,
                'secret': config.secret
            },
            watch: gulpConfig.files.js
        };

        return nodemon(options).on('restart', function () {
            console.log('Restarting...');
        });
    });
})();
