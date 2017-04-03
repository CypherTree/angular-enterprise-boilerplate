'use strict';


var app = angular.module('product-header', []);

app.directive('abProductHeader', function() {
  return {
    restrict: 'E',
    templateUrl: '/product-header/product-header.html',
    scope: {
      social: '=',
      currencies: '=',
      cart: '=',
      header: '@'
    }
  };
});
