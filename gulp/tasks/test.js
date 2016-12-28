(function () {
    'use strict';

    var config = require('../config'),
        gulp = require('gulp'),
        Server = require('karma').Server,
        path = require('path');

    /**
     * Run test once and exit
     */
    gulp.task('test', function (done) {
        var fullPath = path.resolve(config.paths.test + '/karma.conf.js');
        new Server({configFile: fullPath, singleRun: true}, done).start();
    });
})();
