var app = angular.module('nav-header', []);
 
app.directive('abNavHeader', function() {
 
  return {
    restrict: 'E',
    templateUrl:'/nav-header/nav-header.html',
    scope: {
      items: '=ngModel'
    },
    link: function (scope, element, attrs) {
      scope.expand = function (evt) {
        $(evt.currentTarget).siblings().each(function(){
          $(this).find('.sub-header').removeClass('expand')
        })
        var subHeader = $(evt.currentTarget).find('.sub-header')[0]
        $(subHeader).addClass('expand');
        evt.stopPropagation();
      };
 
      var collapseOthers = function (items) {
        items.forEach(function (item) {
          item.expanded = false;
          if (item.categories && item.categories.length) {
            collapseOthers(item.categories);
          }
        });
      };
 
    }
   };
});

