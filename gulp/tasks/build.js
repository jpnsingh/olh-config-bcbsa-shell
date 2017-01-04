(function () {
    'use strict';

    var gulp = require('gulp'),
        runSequence = require('run-sequence');

    module.exports = gulp.task('build', function (callback) {
        runSequence(
            'lint',
            'clean',
            ['less', 'styles', 'images', 'libs', 'templates'],
            'babelify',
            'browserify',
            callback
        );
    });
})();
