(function () {
    'use strict';

    var gulp = require('gulp'),
        gulpConfig = require('../config'),
        Server = require('karma').Server,
        path = require('path');

    gulp.task('test', function (done) {
        var fullPath = path.resolve(gulpConfig.paths.test + '/karma.conf.js');
        new Server({configFile: fullPath, singleRun: true}, done).start();
    });
})();
