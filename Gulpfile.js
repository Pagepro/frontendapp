var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browser = require('browser-sync');
var reload = browser.reload;
var rev = require('gulp-rev');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var phantomjssmith = require('gulp.spritesmith');

gulp.task('rev', function () {
    gulp.src('*.html')
        .pipe(rev())
        .pipe(gulp.dest('.'));
});

gulp.task('serve', ['sass'], function() {
    browser({
        port: process.env.PORT || 4500,
        open: false,
        ghostMode: false,
        server: {
            baseDir: '.'
        }
    });
});
gulp.task('watch', function() {
    gulp.watch("partials/sass/**", ['sass']);
    gulp.watch(['app/templates/**/*.html', 'src/**/*.js'], reload);
});
gulp.task('sass', function () {
    gulp.src('./partials/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/css'))
        .pipe(reload({
            stream: true
        }));
});
gulp.task('autoprefixer', function () {
    return gulp.src('app/css/*.css')
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css/'));
});

gulp.task('default', ['sass', 'copy', 'watch', 'serve']);
gulp.task('compile', ['sass']);
