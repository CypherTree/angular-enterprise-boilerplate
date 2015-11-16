angular.module("navHeaderSample", [
  "navigation-header"
])

.controller("navHeaderSampleCtrl", function($scope) {

  $scope.categories = [{
    title: 'Home '
  }, {
    title: 'Collections ',
    categories: [{
      title: 'All Collections'
    }, {
      title: 'Christmas'
    }, {
      title: 'Fabric Heart'
    }, {
      title: 'Stars'
    }, {
      title: 'Summer Collection'
    }]
  }, {
    title: 'About Us ',
    categories: [{
      title: 'Feature List'
    }, {
      title: 'Theme Setup'
    }, {
      title: 'Contact Us'
    }, {
      title: 'Our other themes',
      categories: [{
        title: 'Duke'
      }, {
        title: 'Beatnik'
      }, {
        title: 'Salt Yard'
      }]
    }]
  }, {
    title: 'Theme Features '
  }, {
    title: 'Register/Login '
  }];
});