(function () {
    'use strict';

    var config = require('../config'),
        gulp = require('gulp');

    module.exports = gulp.task('styles', function () {
        return gulp.src(config.paths.src.styles)
            .pipe(gulp.dest(config.paths.dest.styles));
    });
})();
