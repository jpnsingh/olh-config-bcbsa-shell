(function () {
    'use strict';

    var gulp = require('gulp'),
        config = require('../config'),
        changed = require('gulp-changed');

    module.exports = gulp.task('libs', function () {
        return gulp.src(config.paths.src.libs)
            .pipe(changed(config.paths.dest.libs))
            .pipe(gulp.dest(config.paths.dest.libs));
    });
})();
