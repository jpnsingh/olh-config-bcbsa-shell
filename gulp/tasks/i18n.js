(function () {
    'use strict';

    var gulp = require('gulp'),
        config = require('../config');

    module.exports = gulp.task('i18n', function () {
        return gulp.src(config.paths.src.i18n)
            .pipe(gulp.dest(config.paths.dest.i18n));
    });
})();
