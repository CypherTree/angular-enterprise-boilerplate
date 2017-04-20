
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
Product.$inject = [ '$resource' ,'apiURL']
function Product($resource, apiURL) {
  return $resource(apiURL+'/db/_table/Product'  , {
     fields : '@fields'}, {
    update: {method: 'PATCH'},
    create: {method: 'POST'},
    getRecords :{method: 'GET'}
  });
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
ProductsCtrl.$inject = ['ProductService','Product'];
function ProductsCtrl (ProductService,Product) {
  var vm = this;
  vm.products = [];
  vm.getAllRecords = function () {
        Product.getRecords({
           fields: '*',
    }).$promise.then(function (data){
       vm.products = data.resource;
    });
  }
 vm.getAllRecords();
 vm.insertProduct = function(newProduct){
  let inputJson = {
        "resource": [
           {
           "description" : newProduct.description,
           "category" : newProduct.category,
           "price" : newProduct.price,
           "title" : newProduct.title,
           "available":newProduct.available
          }
        ]
    }
    Product.create(inputJson).$promise.then(function (data){
       vm.getAllRecords();
    });
  }
 vm.updateProduct = function(newProduct){
    let inputJson = {
        "resource": [
           {
             "id":newProduct.id,
           "description" : newProduct.description,
           "category" : newProduct.category,
           "price" : newProduct.price,
           "title" : newProduct.title,
           "available":newProduct.available
          }
        ]
      }
    Product.update(inputJson).$promise.then(function (data){
       vm.getAllRecords();
    });
  }
  vm.addProduct = function (product) {
      if(!product){
        ProductService
          .add(product)
          .then(function (newProduct) {
            vm.insertProduct(newProduct);
          });
       }else{
         ProductService
           .add(product)
           .then(function (newProduct) {
             vm.updateProduct(newProduct);
           });
        }
   };
}

angular
  .module('products', [ 'ngMaterial'])
  .config(Config)
  .service('ProductService', ProductService)
  .factory('Product',Product);
