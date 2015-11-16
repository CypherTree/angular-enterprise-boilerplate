var app = angular.module('navigation-header', []);

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