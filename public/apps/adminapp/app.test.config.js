'use strict';

// This file is only used for karma runner to inject window.CONFIG and other
// custom objects that are needed to run tests

// window.CONFIG = {
//   host: 'http://localhost',
//   uri: '/api/1'
// };
//
// window.locales = {
//   en: {
//
//   }
// };
exports.config = {
  baseUrl: 'http://localhost:8800/adminapp#!',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  suites: {
    app: [
      'app_test.js',
      'account/account_test.js',
      'product/product_test.js',
      'navbar/navbar_test.js'
    ]
  },
  directConnect:true,
  capabilities: {
     browserName: 'chrome',
  },
  allScriptsTimeout:5000000,
};
