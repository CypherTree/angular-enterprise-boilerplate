
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
  AddProductCtrl.$inject = ['$mdDialog','product'];
  function AddProductCtrl ($mdDialog, product) {
      var vm = this;
      vm.item = product;
      vm.add = function () {
        $mdDialog.hide(vm.item);
      };
  }
  this.add = function (item) {
    return $mdDialog.show({
      locals:{product : item},
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
  vm.products=[];
  vm.addProduct = function (product) {
    if(!product){
      ProductService
        .add(product)
        .then(function (newProduct) {
         vm.products.push({
            "name":newProduct.name,
            "price":newProduct.price,
            "available":newProduct.available,
            "description":newProduct.description,
            "category":newProduct.category,
            "id":Date.now()
          });
          console.dir(vm.products);
        });
     }else{
       ProductService
         .add(product)
         .then(function (newProduct) {
          vm.products.push({
             "name":newProduct.name,
             "price":newProduct.price,
             "available":newProduct.available,
             "description":newProduct.description,
             "category":newProduct.category,
             "id":newProduct.id
           });
           console.dir(vm.products);
         });
  }
};
}

angular
  .module('products', [ 'ngMaterial' ])
  .config(Config)
  .service('ProductService', ProductService);
