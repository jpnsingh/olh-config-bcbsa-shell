(function () {
    'use strict';

    var gulp = require('gulp'),
        gulpConfig = require('../config'),
        Server = require('karma').Server,
        path = require('path');

    module.exports = gulp.task('coverage', function (done) {
        var configFilePath = path.resolve(gulpConfig.paths.test + '/karma.coverage.conf.js');
        new Server({configFile: configFilePath, singleRun: true}, done).start();
    });

    // module.exports = gulp.task('coverage-teamcity', function (done) {
    //     var configFilePath = path.resolve(gulpConfig.paths.test + '/karma.coverage-teamcity.conf.js');
    //     new Server({configFile: configFilePath, singleRun: true}, done).start();
    // });
})();
