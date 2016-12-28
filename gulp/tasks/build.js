(function () {
    'use strict';

    var gulp = require('gulp'),
        runSequence = require('run-sequence');

    module.exports = gulp.task('build', function (callback) {
        runSequence(
            'lint',
            'clean',
            'babel',
            ['styles', 'libs', 'templates'],
            'browserify',
            callback
        );
    });
})();
