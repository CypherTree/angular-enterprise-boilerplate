
Config.$inject = [ '$stateProvider' ]
function Config ($stateProvider) {

  $stateProvider
    .state('product', {
       url: '/product',
      templateUrl: '/apps/adminapp/product/products.html',
      controller: ProductsCtrl,
      controllerAs: 'vm'
    })
}


ProductService.$inject = [ '$mdDialog' ]
function ProductService ($mdDialog) {

  AddProductCtrl.$inject = ['$mdDialog'];
  function AddProductCtrl ($mdDialog) {
      var vm = this;
      vm.add = function () {
        $mdDialog.hide(vm.item);
      };
  }

  this.add = function (item) {
    return $mdDialog.show({
      templateUrl: '/apps/adminapp/product/add-product.html',
      clickOutsideToClose: true,
      controller: AddProductCtrl,
      controllerAs: 'vm'
    });
  }
}


ProductsCtrl.$inject = ['ProductService'];
function ProductsCtrl (ProductService) {
  var vm = this;
  vm.products = [];

  vm.addProduct = function () {
    ProductService
      .add()
      .then(function (newProduct) {
        vm.products.push(newProduct);
        vm.products.id=Date.now();
      });
  };


}



angular
  .module('products', [ 'ngMaterial' ])
  .config(Config)
  .service('ProductService', ProductService);
