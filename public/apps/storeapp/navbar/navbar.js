'use strict';


var navbar = {
    bindings: { },
    controllerAs: 'vm',
    controller: NavbarCtrl,
    templateUrl: '/apps/storeapp/navbar/navbar.html'
};


NavbarCtrl.$inject = [];
function NavbarCtrl () {

}


angular
    .module('navbar', [])
    .component('navbar', navbar);
