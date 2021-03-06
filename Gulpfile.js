var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browser = require('browser-sync');
var reload = browser.reload;
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var run = require('gulp-run');
var exec = require('child_process').exec;
var htmlreplace = require('gulp-html-replace');


var spawn = require('child_process').spawn;
var node;
var jsFiles = [
  'libs/jquery/dist/jquery.js',
  'libs/jquery-ui/jquery-ui.js',
  'libs/angular/angular.js',
  'libs/ng-sortable/dist/ng-sortable.js',
  'libs/angular-ui-router/release/angular-ui-router.js',
  'libs/angular-animate/angular-animate.js',
  'libs/angular-off-click/offClick.js',
  'libs/angular-cache/dist/angular-cache.js',
  'libs/angular-ellipsis/src/angular-ellipsis.js',
  'libs/ng-file-upload/ng-file-upload.js',
  'libs/AngularJS-Toaster/toaster.js',
  'libs/angular-sanitize/angular-sanitize.js',
  'libs/jquery.customSelect/jquery.customSelect.js',
  'libs/jquery-nicefileinput/jquery.nicefileinput.js',
  'libs/imagesloaded/imagesloaded.pkgd.js',
  'libs/lodash/lodash.js',
  'app/**/*.js'
];

gulp.task('server', function() {
  if (node) node.kill()
  node = spawn('node', ['fake-server/server.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('js', function() {
  gulp.src(jsFiles)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist'))
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
  gulp.watch('app/common/**/*.scss', ['sass']);
  gulp.watch(['app/**/templates/*.html', 'app/**/directives/**/*.html'], reload);
  gulp.watch(['app/**/*.js'], ['js']);
});


gulp.task('test', function() {
  gulp.src(['app/common/img/*', 'app/common/img/**/*']).pipe(gulp.dest('dist/img'));
  gulp.src(['app/common/fonts/*']).pipe(gulp.dest('dist/fonts'));



  gulp.src(jsFiles)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));


  gulp.src('app/common/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'));

  gulp.src('./index.html')
    .pipe(htmlreplace({
        'js': 'dist/app.min.js'
    }))
    .pipe(gulp.dest('./'))
});



gulp.task('prod', function() {
  gulp.src(['app/common/img/*', 'app/common/img/**/*']).pipe(gulp.dest('dist/img'));
  gulp.src(['app/common/fonts/*']).pipe(gulp.dest('dist/fonts'));

  gulp.src(jsFiles)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));


  gulp.src('app/common/css/*.css')
    .pipe(concat('main.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'));

  gulp.src('./index.html')
    .pipe(htmlreplace({
        'js': 'dist/app.min.js',
        'css': 'dist/css/main.min.css'
    }))
    .pipe(gulp.dest('./'))
});

gulp.task('sass', function() {
  gulp.src('./app/common/sass/**/*.scss')
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/common/css'))
    .pipe(reload({
      stream: true
    }));
});
gulp.task('autoprefixer', function() {
  return gulp.src('app/common/css/*.css')
    .pipe(autoprefixer({
      browsers: ['> 1%'],
      cascade: false
    }))
    .pipe(gulp.dest('app/common/css/'));
});

gulp.task('styleguide', function () {
  run('kss-node app/common/sass/ styleguide/out --template styleguide/template').exec()
    .pipe(gulp.dest('styleguide/output'))
});

gulp.task('default', ['sass', 'watch', 'server', 'serve']);
gulp.task('compile', ['sass', 'prod']);

process.on('exit', function() {
    if (node) node.kill()
})
