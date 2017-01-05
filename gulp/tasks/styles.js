(function () {
    'use strict';

    var gulp = require('gulp'),
        gulpConfig = require('../config');

    module.exports = gulp.task('styles', function () {
        return gulp
            .src(gulpConfig.paths.src.styles)
            .pipe(gulp.dest(gulpConfig.paths.dest.styles));
    });
})();
