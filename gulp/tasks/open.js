(function () {
    'use strict';

    var gulp = require('gulp'),
        open = require('gulp-open'),
        config = require('config');

    gulp.task('open', function () {
        gulp
            .src('src/client/views/index.html')
            .pipe(open({uri: formWebUriFromConfig()}));
    });

    function formWebUriFromConfig() {
        return config.web.protocol + '://' + config.web.host + ':' + config.web.port
    }
})();
