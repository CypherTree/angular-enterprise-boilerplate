
var app = angular.module("navigation-header", []); // module for navigation

app.directive('navHeader', function() {
  
  var NavHeaderCtrl = function($scope) {
  };

  return {
    restrict: 'E',
    controller: NavHeaderCtrl,
    templateUrl:'/nav-header/navigationbar.html',
    scope: {
      items: '=ngModel'
    }
   };
});