(function () {
    'use strict';

    var gulp = require('gulp'),
        gulpConfig = require('../config'),
        templateCache = require('gulp-angular-templatecache'),
        minifyHTML = require('gulp-minify-html'),
        merge2 = require('merge2');

    module.exports = gulp.task('templates', function () {
        return merge2(
            // build template js
            gulp.src(gulpConfig.paths.src.templates)
                .pipe(minifyHTML({empty: true, spare: true, quotes: true}))
                .pipe(templateCache(gulpConfig.module + '.tpl.js', {
                    standalone: true,
                    root: 'templates/',
                    //moduleSystem: 'Browserify',
                    module: gulpConfig.module + '-templates'
                }))
                .pipe(gulp.dest(gulpConfig.paths.dest.js)),
            // deploy partials to own folder
            gulp.src(gulpConfig.paths.src.templates)
                .pipe(minifyHTML({empty: true, spare: true, quotes: true}))
                .pipe(gulp.dest(gulpConfig.paths.dest.templates))
        );
    });
})();
