var app = angular.module('product-footer', []);

app.directive('abProductFooter', function() {
  return {
    restrict: 'E',
    templateUrl: '/product-footer/product-footer.html',
    scope: {
      social: '=',
      cities: '=',
      productName: '@' 
    }
  };
});
