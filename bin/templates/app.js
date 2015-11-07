'use strict';

/**
 * <%= name %>
 */

angular.module('<%= name %>', [
  'sc-header',
  'sc-interceptors',
  'sc-sidebar',
  'sc-translate',
  'sc-analytics',
  'ui.router'
])

/**
 * Application wide constants
 */

.constant('apiURL', window.CONFIG.host.concat(window.CONFIG.uri.replace(/\/$/, '')))
.constant('apiHOST', window.CONFIG.host)
.constant('scAPP', '<%= name %>')

/**
 * Modernizer
 */

.run(['analytics', function (analytics) {
  function supported () {
    return true;
  }

  if (!supported()) {
    window.alert('Some features might not work. Please use a modern browser like chrome or update your browser!');
  }
}])

/**
 * Config
 */

.config([
  '$locationProvider', '$urlRouterProvider', '$httpProvider', '$compileProvider',
  function ($locationProvider, $urlRouterProvider, $httpProvider, $compileProvider) {
    $urlRouterProvider.otherwise('/');

    // Config
    $locationProvider.html5Mode(false);
    $httpProvider.useApplyAsync(true);
    $compileProvider.debugInfoEnabled(false);
  }
])

/**
 * Application controller
 */

.controller('AppCtrl', [
  '$scope', '$rootScope',
  function ($scope, $rootScope) {
    $rootScope.pageTitle = '<%= name %>';
    $scope.sidebar = {};
    $scope.sidebar.items = [
      { title: 'Home', href: '#/', icon: 'circle-o' },
      { title: 'About', href: '#/about', icon: 'circle-o' }
    ];
  }
]);

/**
 * Bootstrap
 */

angular.element(document).ready(function() {
  angular.bootstrap(document, ['<%= name %>'], { strictDi: true });
});
