'use strict';

/**
 * <%= name %> module
 */

angular.module('<%= name %>', [
  <% if (route && ctrl) { -%>
'sc-resource',
  'ui.router'
  <% } else { -%>
// 'sc-resource',
  // 'ui.router',
  <% } -%>
// 'cgBusy'
])

<% if (route && ctrl) { -%>
/**
 * <%= capitalize(name) %> resource
 */

.factory('<%= capitalize(name) %>', [
  '$resource', 'apiURL',
  function ($resource, apiURL) {
    return $resource(apiURL + '/<%= name %>/:_id', { _id: '@_id' });
  }
])

/**
 * Config
 */

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider
    .state('<%= name %>', {
      url: '<%= route %>',
      controller: '<%= ctrl %>',
      templateUrl: '/apps/<%= app %>/<%= name %>/<%= name %>.html',
      resolve: {

      }
    });
}])

/**
 * Controller
 */

.controller('<%= ctrl %>', [
  '$scope', '$rootScope', '$stateParams',
  function ($scope, $rootScope, $params) {
    $rootScope.pageTitle = '<%= name %>';
  }
]);
<% } -%>
