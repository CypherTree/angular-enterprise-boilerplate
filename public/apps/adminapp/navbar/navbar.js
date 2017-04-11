'use strict';


var navbar = {
    bindings: { },
    controllerAs: 'vm',
    controller: NavbarCtrl,
    templateUrl: '/apps/adminapp/navbar/navbar.html'
};


NavbarCtrl.$inject = [];
function NavbarCtrl () {

}


angular
    .module('navbar', [])
    .component('navbar', navbar);
