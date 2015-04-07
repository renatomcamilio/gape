/**
 * Dependencies
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');


/**
 * sources for the tasks
 */

var VENDOR_SCRIPTS = [
    'node_modules/lodash/lodash.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-resource/angular-resource.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/angular-sanitize/angular-sanitize.min.js'
];

var SCRIPTS = 'client/**/*.js';

var STYLES = [
    'node_modules/bootstrap/less/bootstrap.less',
    'client/less/**/*.less'
];

var TEMPLATE_CACHE = 'template-cache/*.js';
var TEMPLATES = 'client/**/*.html';

/**
 * Tasks definition
 */

gulp.task('less', function () {
    return gulp.src(STYLES)
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('template-cache', function () {
    return gulp.src(TEMPLATES)
        .pipe(templateCache('template-cache.js', { standalone: true, module: 'gape.templateCache' }))
        .pipe(gulp.dest('template-cache'));
});

gulp.task('code-style', function () {
    return gulp.src(SCRIPTS)
        .pipe(jscs());
});

gulp.task('lint', function () {
    return gulp.src(SCRIPTS)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('vendor-script', function () {
    return gulp.src(VENDOR_SCRIPTS)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('script', ['code-style', 'lint', 'template-cache'], function () {
    return gulp.src([TEMPLATE_CACHE, SCRIPTS])
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function () {
    gulp.watch([TEMPLATE_CACHE, SCRIPTS], ['script']);
    gulp.watch(TEMPLATES, ['template-cache']);
    gulp.watch(STYLES, ['less']);
});


/**
 * Run options
 */

gulp.task('build', ['less', 'vendor-script', 'script']);
gulp.task('default', ['build']);
gulp.task('dev', ['default', 'watch']);
