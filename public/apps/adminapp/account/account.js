
Config.$inject = [ '$stateProvider' ]
function Config ($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: '/apps/adminapp/account/login.html',
      controller: AcountCtrl,
      controllerAs: 'vm'
    })
    .state('register', {
      url: '/',
      templateUrl: '/apps/adminapp/account/register.html',
      controller: AcountCtrl,
      controllerAs: 'vm'
    })
}

Account.$inject = [ '$resource', 'apiURL' ];
function Account ($resource, apiURL) {
  return $resource(null, null, {
    login : {
      method: 'POST',
      url: apiURL + '/system/admin/session'
    },
    register: {
      method: 'POST',
      url: apiURL + '/api/v2/user/register?login=true'
    }
  });
}

AcountCtrl.$inject = ['Account','$rootScope','$http','$state', '$mdToast'];
function AcountCtrl ( Account, $rootScope, $http, $state, $mdToast) {
var vm = this;
$rootScope.isLoggedIn =false;

vm.login = function () {
  Account.login(vm.form)
    .$promise.then(function (data){
        $http.defaults.headers.common['X-DreamFactory-Session-Token'] = data.session_token;
        $rootScope.isLoggedIn = true;
        $state.go('product')
   }, function(error){
     $mdToast.show(
        $mdToast.simple()
          .textContent('Invalid Credentials. Try login again!')
          .hideDelay(3000)
          .position('top right')

      );
   });
 }
 vm.register = function () {
   Account.register(vm.user)
     .$promise.then(function (data){
         $http.defaults.headers.common['X-DreamFactory-Session-Token'] = data.session_token;
         $state.go('login')
    }, function(error){
      $mdToast.show(
         $mdToast.simple()
           .textContent('Something Went wrong! Please Try again.')
           .hideDelay(3000)
           .position('top right')
       );
    });
  };
}
  angular
    .module('login', [ 'ngMaterial'])
    .config(Config)
    .factory('Account', Account);
