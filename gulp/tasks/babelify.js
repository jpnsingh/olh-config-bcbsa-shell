(function () {
    'use strict';

    var config = require('../config'),
        gulp = require('gulp'),
        babel = require('gulp-babel');

    module.exports = gulp.task('babelify', function () {
        return gulp.src(config.paths.src.js)
            .pipe(babel())
            .pipe(gulp.dest(config.paths.dest.transpiled));
    });
})();
