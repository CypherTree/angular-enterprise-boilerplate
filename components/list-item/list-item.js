'use strict';

angular.module('list-item', [])

.directive('abListItem', [
  function () {

    return {
      restrict: 'E',
      scope: {
        ngModel: '=',
        layout: '=',
        sticker: '@',
        image: '@',
        template: '@'
      },

      templateUrl: '/list-item/list-item.html',
      link: function (scope, element, attrs) {

        // convert object into array if not.
        if (scope.ngModel instanceof Array) {
          scope.items = scope.ngModel;
        } else {
          scope.items = [scope.ngModel];
        }

        scope.showDetail = scope.layout === 'detail';

        scope.triggerDetail = function () {
          scope.showDetail = scope.layout !== 'tile';
        };

        scope.hideDetail = function () {
          scope.showDetail = false;
        };
      }
    };

  }
]);
