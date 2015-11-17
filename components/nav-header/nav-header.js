var app = angular.module('nav-header', []);

app.directive('abNavHeader', function() {

  return {
    restrict: 'E',
    templateUrl:'/nav-header/nav-header.html',
    scope: {
      items: '=ngModel'
    },
    link: function (scope, element, attrs) {
      scope.expand = function (item, evt) {
        if (item.expanded) {
          item.expanded = false;
        }
        else {
          item.expanded = true;
        }

        evt.stopPropagation();
      }
    }
   };
});

