/**
 * Dependencies
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');


/**
 * sources for the tasks
 */

var SCRIPT_SRC = [
    'node_modules/lodash/lodash.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-resource/angular-resource.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/angular-sanitize/angular-sanitize.min.js',
    'template-cache/*.js',
    'client/**/*.js'
];

var STYLES_SRC = [
    'node_modules/bootstrap/less/bootstrap.less',
    'client/less/**/*.less'
];

/**
 * Tasks definition
 */

gulp.task('less', function () {
    return gulp.src(STYLES_SRC)
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('template-cache', function () {
    return gulp.src('client/**/*.html')
        .pipe(templateCache('template-cache.js', { standalone: true, module: 'gape.templateCache' }))
        .pipe(gulp.dest('template-cache'));
});

gulp.task('script', ['template-cache'], function () {
    return gulp.src(SCRIPT_SRC)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/js'));
});


/**
 * Run options
 */

gulp.task('build', ['less', 'script']);
gulp.task('default', ['build']);
