'use strict';

/**
 * adminapp
 */

angular.module('adminapp', [
  'ui.router',
  'ngMaterial',
  'ngResource',

  'products',
  'navbar',
  'login'
])

/**
 * Application wide constants
 */

.constant('apiURL', window.CONFIG.host.concat(window.CONFIG.uri.replace(/\/$/, '')))
.constant('apiHOST', window.CONFIG.host)
.constant('dreamfactoryApiKey', window.CONFIG.dfApiKey)

/**
 * Config
 */

.config([
  '$urlRouterProvider', '$locationProvider', '$httpProvider', '$compileProvider', '$stateProvider',
  function ($urlRouterProvider, $locationProvider, $httpProvider, $compileProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    // Config
    $locationProvider.html5Mode(false);
    $httpProvider.useApplyAsync(true);
    $compileProvider.debugInfoEnabled(false);

    $stateProvider.state('loginUser', {
      url: '/',
      templateUrl: '/apps/adminapp/account/login.html'
    });

    $stateProvider.state('home', {
      url: '/product',
      templateUrl: '/apps/adminapp/product/products.html'
    });
  }
])


.run([ '$http',
  function ($http) {
    var dfApiKey = window.CONFIG.df_api_key;
    if (!dfApiKey) throw 'Cannot proceed without dreamfactory api key';
    $http.defaults.headers.common['X-DreamFactory-Api-Key'] = dfApiKey;
  }
])

/**
 * Application controller
 */

.controller('AppCtrl', [
  '$scope',
  function ($scope) {
  
  }
]);

/**
 * Bootstrap
 */

angular.element(document).ready(function() {
  angular.bootstrap(document, ['adminapp'], { strictDi: true });
});
