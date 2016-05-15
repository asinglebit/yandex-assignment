var gulp = require('gulp'),
    del = require('del'),
    gp_concat = require('gulp-concat'),
    gp_uglify = require('gulp-uglify'),
    gp_cssmin = require('gulp-cssmin');

var scripts = [
  'public/scripts/_framework/_framework.js',
  'public/scripts/_framework/utils/**/*.js',
  'public/scripts/_framework/components/**/*.js',
  'public/scripts/app.js'
];

var styles = 'public/styles/*.css';

gulp.task('cleanup-pre', function(){
    return del('public/dist/*');
});

gulp.task('scripts', function(){
    return gulp.src(scripts)
        .pipe(gp_uglify())
        .pipe(gp_concat('scripts.min.js'))
        .pipe(gulp.dest('public/dist'));
});

gulp.task('styles', function(){
    return gulp.src(styles)
        .pipe(gp_cssmin())
        .pipe(gp_concat('styles.min.css'))
        .pipe(gulp.dest('public/dist'));
});

// Default task

gulp.task('default', ['cleanup-pre', 'scripts', 'styles']);
