(function () {
    'use strict';

    var gulp = require('gulp'),
        open = require('gulp-open'),
        config = require('config');

    module.exports = gulp.task('open', function () {
        return gulp
            .src('src/client/views/index.html')
            .pipe(open({uri: formWebUriFromConfig()}));
    });

    function formWebUriFromConfig() {
        return config.web.PROTOCOL + '://' + config.web.HOST + ':' + config.web.PORT
    }
})();
