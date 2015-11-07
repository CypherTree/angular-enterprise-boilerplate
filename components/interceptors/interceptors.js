'use strict';

/**
 * sc-interceptors
 */

angular.module('sc-interceptors', [
  'sc-alerts'
])

.constant('token', ['$window', 'alerts', '$q', function ($window, alerts, $q) {
  return {
    request: function (config) {
      // Set the x-auth-token to authenticate endpoints
      config.headers['x-auth-token'] = $window.CONFIG && $window.CONFIG.token;
      return config;
    },
    responseError: function (rejection) {
      if (rejection && rejection.data && rejection.data.message) {
        alerts.notify({
          title: 'Error!',
          text: rejection.data.message,
          type: 'error'
        });
      }
      return $q.reject(rejection);
    }
  };
}])

.config(['$httpProvider', 'token', function ($httpProvider, token) {
  $httpProvider.interceptors.push(token);
}]);
