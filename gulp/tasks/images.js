(function () {
    'use strict';

    var config = require('../config'),
        gulp = require('gulp');

    module.exports = gulp.task('images', function () {
        return gulp.src(config.paths.src.images)
            .pipe(gulp.dest(config.paths.dest.images));
    });
})();
