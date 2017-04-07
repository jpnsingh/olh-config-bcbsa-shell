(function () {
    'use strict';

    var gulpConfig = require('../config'),
        gulp = require('gulp'),
        rimraf = require('gulp-rimraf');

    module.exports = gulp.task('clean', function () {
        return gulp
            .src([gulpConfig.paths.dest.root, gulpConfig.paths.dest.transpiled], {read: false})
            .pipe(rimraf());
    });
})();
