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
        template: '@',
        active: '=?'
      },

      templateUrl: '/list-item/list-item.html',
      link: function (scope, element, attrs) {

        // convert object into array if not.
        if (scope.ngModel instanceof Array) {
          scope.items = scope.ngModel;
        } else {
          scope.items = [scope.ngModel];
        }

        scope.triggerDetail = function () {

          // if same item has been clicked then close it and return
          if ($('.ab-list-item > .detail:visible')[0] === element.find('.detail')[0]) {
            scope.hideDetail();
            return;
          }

          // collapse other items
          $('.ab-list-item')
            .css('padding-bottom', 0)
            .removeClass('expanded');


          // show current detail item
          element.find('.detail').removeClass('ng-hide');

          // add bottom padding to shift other elements down.
          setTimeout(function () {
            var addedPadding = element.find('.detail').outerHeight();
            element.find('.ab-list-item')
              .css('padding-bottom', addedPadding)
              .addClass('expanded');
          }, 0);
        };

        scope.hideDetail = function () {
          // remove padding
          element.find('.ab-list-item')
            .css('padding-bottom', 0)
            .removeClass('expanded');
        };
      }
    };

  }
]);
