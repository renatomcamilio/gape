var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');


gulp.task('less', function () {
    return gulp.src('./client/less/**/*.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./public/css'));
});


gulp.task('default', ['less']);
