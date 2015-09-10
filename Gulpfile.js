var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browser = require('browser-sync');
var reload = browser.reload;
var rev = require('gulp-rev');
var autoprefixer = require('gulp-autoprefixer');
var htmllint = require('gulp-htmllint');
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
    gulp.watch("src/sass/**", ['sass']);
    gulp.watch("src/img/**", ['copy']);
    gulp.watch(['app/templates/**/*.html', 'src/**/*.js'], reload);
});
gulp.task('copy', function() {
    gulp.src('src/img/**')
      .pipe(gulp.dest('app/img'));
    gulp.src('src/fonts/**')
      .pipe(gulp.dest('app/fonts'));
});
gulp.task('sass', function () {
    gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/css'))
        .pipe(reload({
            stream: true
        }));
});
gulp.task('sprites', function () {
    var spriteData = gulp.src('src/img/sprite/*.png').pipe(spritesmith({
        imgName: 'app/img/sprite.png',
        cssName: 'src/sass/sprites.scss',
        imgPath: '../app/img/sprite.png',
        engine: phantomjssmith
    }));
    return spriteData.pipe(gulp.dest('.'));
});
gulp.task('autoprefixer', function () {
    return gulp.src('app/css/*.css')
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css/'));
});
gulp.task('htmllint', function() {
    return gulp.src('index.html')
        .pipe(htmllint());
});

gulp.task('default', ['sass', 'copy', 'watch', 'serve']);
gulp.task('compile', ['sass']);
gulp.task('publish', ['rev', 'autoprefixer', 'htmllint']);
