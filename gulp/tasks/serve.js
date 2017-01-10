(function () {
    'use strict';

    var gulp = require('gulp'),
        nodemon = require('gulp-nodemon'),
        gulpConfig = require('../config'),
        runSequence = require('run-sequence');

    module.exports = gulp.task('serve', function (callback) {
        runSequence(
            'build',
            'inject',
            callback
        );

        return nodemon(gulpConfig.nodemon.options)
            .on('restart', function (changedFiles) {
                console.log('Changed file %s\n', changedFiles);
                console.log('Restarting...\n');
            });
    });
})();
