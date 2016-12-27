(function () {
    'use strict';

    var gulp = require('gulp'),
        jshint = require('gulp-jshint'),
        jscs = require('gulp-jscs'),
        config = require('../config');

    gulp.task('lint', function () {
        return gulp
            .src(config.files.js)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
            .pipe(jscs());
    });
})();
