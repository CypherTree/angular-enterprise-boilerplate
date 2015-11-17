var app = angular.module('navigation-header', []);

app.directive('abNavHeader', function() {
  
  var NavHeaderCtrl = function($scope) {
  };

  return {
    restrict: 'E',
    controller: NavHeaderCtrl,
    templateUrl:'/nav-header/nav-header_example_template.html',
    scope: {
      items: '=ngModel'
    }
   };
});