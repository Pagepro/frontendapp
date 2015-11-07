var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browser = require('browser-sync');
var reload = browser.reload;
var rev = require('gulp-rev');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');



gulp.task('rev', function() {
  gulp.src('*.html')
    .pipe(rev())
    .pipe(gulp.dest('.'));
});

gulp.task('js', function() {
  gulp.src(['app/**/module.js', 'app/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('out'))
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

gulp.task('watch', ['js'], function() {
  gulp.watch('partials/sass/**', ['sass']);
  gulp.watch(['partials/templates/**/*.html', 'app/**/*.html'], reload);
  gulp.watch(['app/**/*.js'], ['js']);
});

gulp.task('prod', function() {
  gulp.src(['out/app.js'])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('out'))
});

gulp.task('sass', function() {
  gulp.src('./partials/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./partials/css'))
    .pipe(reload({
      stream: true
    }));
});
gulp.task('autoprefixer', function() {
  return gulp.src('partials/css/*.css')
    .pipe(autoprefixer({
      browsers: ['> 1%'],
      cascade: false
    }))
    .pipe(gulp.dest('partials/css/'));
});

gulp.task('default', ['sass', 'watch', 'serve']);
gulp.task('compile', ['sass', 'prod']);
