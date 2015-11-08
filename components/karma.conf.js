'use strict';

// Karma configuration

module.exports = function (config) {
  config.set({

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // bower_components
      '../public/bower_components/jquery/dist/jquery.js',
      '../public/bower_components/angular/angular.js',
      '../public/bower_components/angular-resource/angular-resource.js',
      '../public/bower_components/angular-translate/angular-translate.js',
      '../public/bower_components/angular-animate/angular-animate.js',
      '../public/bower_components/angular-mocks/angular-mocks.js',
      '../public/bower_components/angular-ui-router/release/angular-ui-router.js',

      // templates
      '**/*.html',

      // components and tests
      '**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // html2js
      '**/*.html': 'ng-html2js',

      // istanbul coverage
      '**/*.js': ['coverage'],
      '*.js': ['coverage'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // optionally, configure the reporter
    coverageReporter: {
      type : 'lcov',
      dir : '../public/coverage',
      subdir: 'components'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file
    // changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS',
      // 'Chrome'
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
