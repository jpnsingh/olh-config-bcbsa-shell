(function () {
    'use strict';

    var gulp = require('gulp');

    module.exports = gulp.task('watch', function () {
        return gulp.watch('./src/*.js', ['lint'/*, 'test'*/]);
    });
})();
