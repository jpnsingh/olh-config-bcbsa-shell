(function () {
    'use strict';

    var gulp = require('gulp'),
        wiredep = require('wiredep').stream,
        gulpInject = require('gulp-inject'),
        config = require('../config');

    gulp.task('inject', function () {
        return gulp.src(config.inject.src)
            .pipe(wiredep(config.inject.wiredep.options))
            .pipe(gulpInject(gulp.src([config.inject.gulp.src.css, config.inject.gulp.src.js], {read: false}),
                config.inject.gulp.options))
            .pipe(gulp.dest(config.inject.dest));
    });
})();
