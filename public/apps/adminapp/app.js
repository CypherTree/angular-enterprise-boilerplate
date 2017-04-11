'use strict';

/**
 * adminapp
 */

angular.module('adminapp', [
  'ui.router',
  'ngMaterial',

  'products',
  'navbar'
])

/**
 * Application wide constants
 */

.constant('apiURL', window.CONFIG.host.concat(window.CONFIG.uri.replace(/\/$/, '')))
.constant('apiHOST', window.CONFIG.host)


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

    $stateProvider.state('home', {
      url: '/',
      templateUrl: '/apps/adminapp/home/home.html'
    });
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
