
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
  return $resource('https://ft-anitrai011.vz2.dreamfactory.com/api/v2/db/_table/Product'  , {
     fields : '@fields'}, {
    update: {method: 'PATCH',headers:{ 'X-DreamFactory-Api-Key': '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88','X-DreamFactory-Session-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInVzZXJfaWQiOjEsImVtYWlsIjoiYW5pdHJhaTAxMUBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2Z0LWFuaXRyYWkwMTEudnoyLmRyZWFtZmFjdG9yeS5jb21cL2FwaVwvdjJcL3N5c3RlbVwvYWRtaW5cL3Nlc3Npb24iLCJpYXQiOjE0OTI1ODk5NzAsImV4cCI6MTQ5MjU5MzU3MCwibmJmIjoxNDkyNTg5OTcwLCJqdGkiOiJlMjFkNjkyODZjOTUyYjdiMjhkNTMwOGMzOThhMzk2YyJ9.-Kyx4GIvuCuZiBax0cPN7G_xOWmge8lk1YfGuZeydV4'}},
    create: {method: 'POST',headers:{ 'X-DreamFactory-Api-Key': '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88','X-DreamFactory-Session-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInVzZXJfaWQiOjEsImVtYWlsIjoiYW5pdHJhaTAxMUBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2Z0LWFuaXRyYWkwMTEudnoyLmRyZWFtZmFjdG9yeS5jb21cL2FwaVwvdjJcL3N5c3RlbVwvYWRtaW5cL3Nlc3Npb24iLCJpYXQiOjE0OTI1ODk5NzAsImV4cCI6MTQ5MjU5MzU3MCwibmJmIjoxNDkyNTg5OTcwLCJqdGkiOiJlMjFkNjkyODZjOTUyYjdiMjhkNTMwOGMzOThhMzk2YyJ9.-Kyx4GIvuCuZiBax0cPN7G_xOWmge8lk1YfGuZeydV4'}},
    getRecords :{method: 'GET', headers: { 'X-DreamFactory-Api-Key': '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88','X-DreamFactory-Session-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInVzZXJfaWQiOjEsImVtYWlsIjoiYW5pdHJhaTAxMUBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2Z0LWFuaXRyYWkwMTEudnoyLmRyZWFtZmFjdG9yeS5jb21cL2FwaVwvdjJcL3N5c3RlbVwvYWRtaW5cL3Nlc3Npb24iLCJpYXQiOjE0OTI1ODk5NzAsImV4cCI6MTQ5MjU5MzU3MCwibmJmIjoxNDkyNTg5OTcwLCJqdGkiOiJlMjFkNjkyODZjOTUyYjdiMjhkNTMwOGMzOThhMzk2YyJ9.-Kyx4GIvuCuZiBax0cPN7G_xOWmge8lk1YfGuZeydV4'}}
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
