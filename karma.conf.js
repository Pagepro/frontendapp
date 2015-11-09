'use strict';

// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',


    // required plugins
    plugins: [
      // Karma will require() these plugins
      'karma-jasmine',
      'karma-chrome-launcher'
    ],


    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'lib/angular/angular.js',
      'lib/angular-mocks/angular-mocks.js',
      'lib/angular-ui-router/release/angular-ui-router.js',
      'lib/angular-off-click/offClick.js',
      'lib/angular-animate/angular-animate.js',
      'app/app.js',
      'app/auth/**/*.js',
      'app/common/**/*.js',
      'app/panel/**/*.js',
      'tests/auth/**/*.js'
    ],


    // list of files / patterns to exclude
    exclude: [],


    // web server port
    port: 9876,


    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
  console.log('Karma is running');
};
