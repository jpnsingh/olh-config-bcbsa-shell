(function () {
    'use strict';

    var config = require('../config');
    var gulp = require('gulp');
    var babel = require('gulp-babel');

    module.exports = gulp.task('babel', function () {
        return gulp.src(config.paths.src.js)
            .pipe(babel())
            .pipe(gulp.dest(config.paths.dest.transpiled));
    });
})();
