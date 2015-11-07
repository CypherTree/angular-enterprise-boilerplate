'use strict';

/**
 * sc-translate
 *
 * Dependencies
 *
 *    pascalprecht.translate
 *
 * Usage:
 *
 *    Make sure you set `window.locales.en` to the object/json that
 *    contains the translations mapping. Then simply include
 *
 *    angular.module('YOUR_MODULE', [
 *      'sc-translate',
 *      ...
 *    ])
 *
 * You can further extend this by adding more tranlsation modules
 */

angular.module('sc-translate', [
  'pascalprecht.translate'
])

/**
 * Translation and default routing
 */

.config([
  '$translateProvider',
  function ($translateProvider) {
    $translateProvider.translations('en', window.locales.en);
    $translateProvider.preferredLanguage('en');
  }
]);
