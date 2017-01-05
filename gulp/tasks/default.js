(function () {
    'use strict';

    var gulp = require('gulp'),
        runSequence = require('run-sequence');

    module.exports = gulp.task('default', function (callback) {
        runSequence(
            'serve',
            'open',
            callback
        );
    });
})();
