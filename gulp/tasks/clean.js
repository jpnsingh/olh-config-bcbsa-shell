(function () {
    'use strict';

    var gulpConfig = require('../config'),
        gulp = require('gulp'),
        rimraf = require('gulp-rimraf');

    module.exports = gulp.task('clean', function () {
        return gulp
            .src(gulpConfig.paths.dest.root, {read: false})
            .pipe(rimraf());
    });
})();
