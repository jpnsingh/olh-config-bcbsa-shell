(function () {
    'use strict';

    'use strict';

    var config = require('../config'),
        gulp = require('gulp'),
        templateCache = require('gulp-angular-templatecache'),
        minifyHTML = require('gulp-minify-html'),
        merge2 = require('merge2');

    module.exports = gulp.task('templates', function () {
        return merge2(
            // build template js
            gulp.src(config.paths.src.templates)
                .pipe(minifyHTML({empty: true, spare: true, quotes: true}))
                .pipe(templateCache(config.module + '.tpl.js', {
                    standalone: true,
                    root: 'templates/' + config.module + '/',
                    //moduleSystem: 'Browserify',
                    module: config.module + '-templates'
                }))
                .pipe(gulp.dest(config.paths.dest.js)),
            // deploy partials to own folder
            gulp.src(config.paths.src.templates)
                .pipe(minifyHTML({empty: true, spare: true, quotes: true}))
                .pipe(gulp.dest(config.paths.dest.templates))
        );
    });
})();
