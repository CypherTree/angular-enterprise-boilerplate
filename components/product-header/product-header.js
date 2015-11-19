var app = angular.module('product-header', []);

app.directive('abProductHeader', function() {
  return {
    restrict: 'E',
    templateUrl: '/product-header/product-header.html',
    scope: {
      name: '=ngModel'
    },
    link: function(scope, element, attrs) {

    }
  };
});