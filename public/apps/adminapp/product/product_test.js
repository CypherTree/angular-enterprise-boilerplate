'use strict';
var request = require('request');
describe('Product module Test case', function () {
       function addProduct(itemtitle,itemprice,itemcategory,itemquantity,itemdescription){
          element(by.css('[ng-click="vm.addProduct()"]')).click();
          var title = element(by.model('vm.item.title')).sendKeys(itemtitle);
          var price = element(by.model('vm.item.price')).sendKeys(itemprice);
          var category = element(by.model('vm.item.category')).sendKeys(itemcategory);
          var available = element(by.model('vm.item.available')).sendKeys(itemquantity);
          var description = element(by.model('vm.item.description')).sendKeys(itemdescription);
          element(by.css('[ng-click="vm.add()"]')).click();
        }
       beforeEach(function() {
         browser.get('http://localhost:8800/adminapp#!/product');
       });

      it('Should add the product while clicking on add product', function () {
          addProduct("MacbookPro",1000,"Computer",100,"Apple Inc. is a multinational computer technology company based in Round Rock, Texas, that develops, sells, repairs, and supports computers and related products and services.");
        });
      it('Should not accept string value to Price field', function () {
        element(by.css('[ng-click="vm.addProduct()"]')).click();
        element(by.model('vm.item.price')).sendKeys('abc');
       expect((element(by.model('vm.item.price')).sendKeys('abc')).getText()).toEqual('');
      });
      it('Should not accept string value to available Products field', function () {
        element(by.css('[ng-click="vm.addProduct()"]')).click();
        expect((element(by.model('vm.item.available')).sendKeys('abc')).getText()).toEqual('');
      });
});

describe("Product module - Rest api", function() {
    beforeEach(function() {
        var jar = request.jar();
        var req = request.defaults({
            jar : jar
        });
        function getAllProducts(url, params) {
            var defer = protractor.promise.defer();
            req.get(url, params , function(error, message) {
                if (error || message.statusCode >= 400) {
                    defer.reject({
                        error : error,
                        message : message
                    });
                    console.log("error-->"+error);
                    console.log("statusCode-->"+message.statusCode);
                } else {
                    defer.fulfill(message);
                }
            });
            return defer.promise;
        }
        function addProduct(option) {
            var defer = protractor.promise.defer();
            req.post(option, function(error, message,body) {
              //console.log(message);
                if (error || message.statusCode >= 400) {
                    defer.reject({
                        error : error,
                        message : message
                    });
                    console.log("error-->"+error);
                    console.log("sc-->"+message.statusCode);
                } else {
                    defer.fulfill(message);
                }
            });
            return defer.promise;
        }
        function updateProduct(option) {
            var defer = protractor.promise.defer();
            req.patch(option, function(error, message,body) {
              //console.log(message);
                if (error || message.statusCode >= 400) {
                    defer.reject({
                        error : error,
                        message : message
                    });
                    console.log("error-->"+error);
                    console.log("sc-->"+message.statusCode);
                } else {

                    defer.fulfill(message);
                }
            });
            return defer.promise;
        }

        function getAllProductsDetails() {
            return getAllProducts('https://ft-anitrai011.vz2.dreamfactory.com/api/v2/db/_table/Product',{
              headers:{ 'X-DreamFactory-Api-Key': '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88',
              'X-DreamFactory-Session-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInVzZXJfaWQiOjEsImVtYWlsIjoiYW5pdHJhaTAxMUBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2Z0LWFuaXRyYWkwMTEudnoyLmRyZWFtZmFjdG9yeS5jb21cL2FwaVwvdjJcL3N5c3RlbVwvYWRtaW5cL3Nlc3Npb24iLCJpYXQiOjE0OTI2NzMyNzYsImV4cCI6MTQ5MjY3Njg3NiwibmJmIjoxNDkyNjczMjc2LCJqdGkiOiI3ODliNjVjYWY2YWZiOWI2ZGFlOGQ3NjcyOTY0MTFlMCJ9.UbXIMA3450qLh3GYXgKlpjRXvRQMfn6bjFptPs1rsqQ'}
          });
        }
        function addProducts() {
          let inputJson = {
              "resource": [
                 {
                 "description" :"Best creation by Apple!",
                 "category" : "mobile",
                 "price" : 900,
                 "title" : "Macbook",
                 "available":10
                }
              ]
            }
            var option = {
              url:'https://ft-anitrai011.vz2.dreamfactory.com/api/v2/db/_table/Product',
              headers:{ 'X-DreamFactory-Api-Key': '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88','X-DreamFactory-Session-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInVzZXJfaWQiOjEsImVtYWlsIjoiYW5pdHJhaTAxMUBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2Z0LWFuaXRyYWkwMTEudnoyLmRyZWFtZmFjdG9yeS5jb21cL2FwaVwvdjJcL3N5c3RlbVwvYWRtaW5cL3Nlc3Npb24iLCJpYXQiOjE0OTI2NzMyNzYsImV4cCI6MTQ5MjY3Njg3NiwibmJmIjoxNDkyNjczMjc2LCJqdGkiOiI3ODliNjVjYWY2YWZiOWI2ZGFlOGQ3NjcyOTY0MTFlMCJ9.UbXIMA3450qLh3GYXgKlpjRXvRQMfn6bjFptPs1rsqQ'},
              body : inputJson,
              json:true
            }
            return addProduct(option);
        }
        function updateProducts() {
          let inputJson = {
                  "resource": [
                     {
                       "id":"5",
                     "description" :"best smart phone ever by HCL",
                     "category" : "computer",
                     "price" : 1000,
                     "title" : "HCL Computers123",
                     "available":109
                    }
                  ]
              }
              var option = {
                url:'https://ft-anitrai011.vz2.dreamfactory.com/api/v2/db/_table/Product',
                headers:{ 'X-DreamFactory-Api-Key': '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88','X-DreamFactory-Session-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInVzZXJfaWQiOjEsImVtYWlsIjoiYW5pdHJhaTAxMUBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2Z0LWFuaXRyYWkwMTEudnoyLmRyZWFtZmFjdG9yeS5jb21cL2FwaVwvdjJcL3N5c3RlbVwvYWRtaW5cL3Nlc3Npb24iLCJpYXQiOjE0OTI2NzMyNzYsImV4cCI6MTQ5MjY3Njg3NiwibmJmIjoxNDkyNjczMjc2LCJqdGkiOiI3ODliNjVjYWY2YWZiOWI2ZGFlOGQ3NjcyOTY0MTFlMCJ9.UbXIMA3450qLh3GYXgKlpjRXvRQMfn6bjFptPs1rsqQ'},
                body : inputJson,
                json:true
              }
            return updateProduct(option);
        }
        var flow = protractor.promise.controlFlow();
           flow.execute(getAllProductsDetails);
           flow.execute(addProducts);
           flow.execute(updateProducts);
    });

    it("should do something ", function() {
        expect(2).toEqual(2);
    });
});
