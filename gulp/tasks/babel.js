(function () {
    'use strict';

    var gulpConfig = require('../config'),
        gulp = require('gulp'),
        babel = require('gulp-babel');

    module.exports = gulp.task('babel', function () {
        return gulp.src(gulpConfig.paths.src.js)
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest(gulpConfig.paths.dest.transpiled));
    });
})();
