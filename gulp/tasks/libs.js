(function () {
    'use strict';

    var gulp = require('gulp'),
        gulpConfig = require('../config'),
        changed = require('gulp-changed');

    module.exports = gulp.task('libs', function () {
        return gulp
            .src(gulpConfig.paths.src.libs)
            .pipe(changed(gulpConfig.paths.dest.libs))
            .pipe(gulp.dest(gulpConfig.paths.dest.libs));
    });
})();
