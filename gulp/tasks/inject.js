(function () {
    'use strict';

    var gulp = require('gulp'),
        wiredep = require('wiredep').stream,
        gulpInject = require('gulp-inject'),
        gulpConfig = require('../config');

    gulp.task('inject', function () {
        return gulp.src(gulpConfig.inject.src)
            .pipe(wiredep(gulpConfig.inject.wiredep.options))
            .pipe(gulpInject(gulp.src([gulpConfig.inject.gulp.src.css, gulpConfig.inject.gulp.src.js], {read: false}),
                gulpConfig.inject.gulp.options))
            .pipe(gulp.dest(gulpConfig.inject.dest));
    });
})();
