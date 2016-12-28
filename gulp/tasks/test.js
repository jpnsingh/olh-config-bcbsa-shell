(function () {
    'use strict';

    var config = require('../config');
    var gulp = require('gulp');
    var karma = require('karma').server;
    var path = require('path');

    /**
     * Run test once and exit
     */
    gulp.task('test', function (done) {
        var fullPath = path.resolve(config.paths.test + '/karma.conf.js');
        karma.start({configFile: fullPath, singleRun: true}, done);
    });
})();
