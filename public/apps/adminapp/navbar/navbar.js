'use strict';


var navbar = {
    bindings: { },
    controllerAs: 'vm',
    controller: NavbarCtrl,
    templateUrl: '/apps/adminapp/navbar/navbar.html'
};

Logout.$inject = [ '$resource', 'apiURL' ];
function Logout($resource, apiURL) {
  return $resource(apiURL+'/user/session'  , {}, {
    deleteSession: {method: 'DELETE'},
  });
}

NavbarCtrl.$inject = ['Logout', '$state' ,'$http'];
function NavbarCtrl (Logout , $state , $http) {
  var vm = this;
  vm.logout = function (){
    Logout.deleteSession()
    .$promise.then(function (data){
     $state.go('login');
     delete $http.defaults.headers.common['X-DreamFactory-Session-Token'];
    },function (error){
      $mdToast.show(
         $mdToast.simple()
           .textContent('Something Went wrong! Please Try again.')
           .hideDelay(3000)
           .position('top right')
       );
    });
  }
}


angular
    .module('navbar', [])
    .component('navbar', navbar)
    .factory('Logout',Logout);
