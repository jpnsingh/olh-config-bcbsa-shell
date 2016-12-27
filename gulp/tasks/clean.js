(function () {
    'use strict';

    var config = require('../config'),
        gulp = require('gulp'),
        rimraf = require('gulp-rimraf');

    module.exports = gulp.task('clean', function () {
        return gulp
            .src(config.paths.dest.root, {read: false})
            .pipe(rimraf());
    });
})();
