(function () {
    'use strict';

    var gulpConfig = require('../config'),
        gulp = require('gulp'),
        babel = require('gulp-babel');

    module.exports = gulp.task('babelify', function () {
        return gulp.src(gulpConfig.paths.src.js)
            .pipe(babel())
            .pipe(gulp.dest(gulpConfig.paths.dest.transpiled));
    });
})();
