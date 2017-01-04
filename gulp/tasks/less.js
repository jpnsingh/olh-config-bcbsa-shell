(function () {
    'use strict';

    var gulp = require('gulp'),
        less = require('gulp-less'),
        gulpConfig = require('../config');


    module.exports = gulp.task('less', function () {
        return gulp
            .src(gulpConfig.paths.src.less)
            .pipe(less())
            .pipe(gulp.dest(gulpConfig.paths.dest.css));

    })
})();
