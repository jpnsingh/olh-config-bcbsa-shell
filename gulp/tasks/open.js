(function () {
    'use strict';

    var gulp = require('gulp'),
        open = require('gulp-open'),
        config = require('config');

    gulp.task('open', function () {
        gulp
            .src('src/client/views/index.html')
            .pipe(open({uri: config.webUrl}));
    });
})();
