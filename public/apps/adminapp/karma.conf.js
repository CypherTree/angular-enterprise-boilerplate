'use strict';

// Karma configuration

module.exports = function (config) {

  // collect app files
  var app = require('./app.json');
  var files = [];

  app.dependencies.forEach(function (dep) {
    files.push('../../bower_components/' + dep);
  });

  files.push('app.test.config.js');

  app.components.forEach(function (com) {
    files.push('../../../components/' + com);
  });

  // files = files.concat(app.files);

  config.set({

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: files.concat([
      // templates
      '**/*.html',

      // modules and tests
      '**/*.js'
    ]),


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // html2js
      '**/*.html': 'ng-html2js',

      // istanbul coverage
      '**/*.js': 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // optionally, configure the reporter
    coverageReporter: {
      type : 'lcov',
      dir : '../../coverage/',
      subdir: 'adminapp'
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
