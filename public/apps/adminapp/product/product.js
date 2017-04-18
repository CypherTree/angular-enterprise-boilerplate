
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

ProductManagerFactory.$inject = [ '$resource' ,'apiURL']
function ProductManagerFactory($resource, apiURL) {
  return $resource('https://ft-anitrai011.vz2.dreamfactory.com/api/v2/db/_table/Product'  , {
     fields : '@fields'}, {
    update: {method: 'PATCH',headers:{ 'X-DreamFactory-Api-Key': '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88','X-DreamFactory-Session-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInVzZXJfaWQiOjEsImVtYWlsIjoiYW5pdHJhaTAxMUBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2Z0LWFuaXRyYWkwMTEudnoyLmRyZWFtZmFjdG9yeS5jb21cL2FwaVwvdjJcL3N5c3RlbVwvYWRtaW5cL3Nlc3Npb24iLCJpYXQiOjE0OTI1MTM5MjYsImV4cCI6MTQ5MjUxNzUyNiwibmJmIjoxNDkyNTEzOTI2LCJqdGkiOiI1NTE3ZDI0ZTk0NmFmMWVjYzU4NDExYzc3NThkNmI5YiJ9.bpuxUlamdkLp_qkD0LdRgBSwUCvf-bA8Py1iem_SERw'}},
    create: {method: 'POST',headers:{ 'X-DreamFactory-Api-Key': '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88','X-DreamFactory-Session-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInVzZXJfaWQiOjEsImVtYWlsIjoiYW5pdHJhaTAxMUBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2Z0LWFuaXRyYWkwMTEudnoyLmRyZWFtZmFjdG9yeS5jb21cL2FwaVwvdjJcL3N5c3RlbVwvYWRtaW5cL3Nlc3Npb24iLCJpYXQiOjE0OTI1MTM5MjYsImV4cCI6MTQ5MjUxNzUyNiwibmJmIjoxNDkyNTEzOTI2LCJqdGkiOiI1NTE3ZDI0ZTk0NmFmMWVjYzU4NDExYzc3NThkNmI5YiJ9.bpuxUlamdkLp_qkD0LdRgBSwUCvf-bA8Py1iem_SERw'}},
    getRecords :{method: 'GET', headers: { 'X-DreamFactory-Api-Key': '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88','X-DreamFactory-Session-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInVzZXJfaWQiOjEsImVtYWlsIjoiYW5pdHJhaTAxMUBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2Z0LWFuaXRyYWkwMTEudnoyLmRyZWFtZmFjdG9yeS5jb21cL2FwaVwvdjJcL3N5c3RlbVwvYWRtaW5cL3Nlc3Npb24iLCJpYXQiOjE0OTI1MTM5MjYsImV4cCI6MTQ5MjUxNzUyNiwibmJmIjoxNDkyNTEzOTI2LCJqdGkiOiI1NTE3ZDI0ZTk0NmFmMWVjYzU4NDExYzc3NThkNmI5YiJ9.bpuxUlamdkLp_qkD0LdRgBSwUCvf-bA8Py1iem_SERw'}}
  });
}

ProductsCtrl.$inject = ['ProductService','ProductManagerFactory'];
function ProductsCtrl (ProductService,ProductManagerFactory) {
  var vm = this;
  vm.products = [];
  vm.getAllRecords = function () {
        ProductManagerFactory.getRecords({
           fields: '*',
    }).$promise.then(function (data){
       vm.products = data.resource;
    });
  }
  vm.getAllRecords();
  vm.addProduct = function (product) {
      if(!product){
        ProductService
          .add(product)
          .then(function (newProduct) {
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
            ProductManagerFactory.create(inputJson).$promise.then(function (data){
               vm.getAllRecords();
            });
          });
       }else{
         ProductService
           .add(product)
           .then(function (newProduct) {
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
             ProductManagerFactory.update(inputJson).$promise.then(function (data){
                vm.getAllRecords();
             });
           });
        }
   };
}

angular
  .module('products', [ 'ngMaterial'])
  .config(Config)
  .service('ProductService', ProductService)
  .factory('ProductManagerFactory',ProductManagerFactory);
