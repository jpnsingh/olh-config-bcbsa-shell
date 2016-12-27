(function () {
    'use strict';

    var gulp = require('gulp'),
        browserify = require('browserify'),
        source = require('vinyl-source-stream'),
        browserifyShim = require('browserify-shim'),
        gulpConfig = require('../config'),
        config = require('config');

    module.exports = gulp.task('browserify', function () {
        return browserify({
            entries: [gulpConfig.paths.src.browserify.entry],
            debug: true
        })
            .transform(browserifyShim).bundle()
            .pipe(source(config.app + '.js'))
            .pipe(gulp.dest(gulpConfig.paths.dest.js));
    });
})();
