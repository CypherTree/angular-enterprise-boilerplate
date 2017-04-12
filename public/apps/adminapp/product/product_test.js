'use strict';

describe('Product module Test case', function () {

       beforeEach(function() {
         browser.get('http://localhost:8800/adminapp#!/product');
       });

      it('should lead to the Add product component', function () {
        browser.get('http://localhost:8800/adminapp#!/product')
          .then(function () {
            expect(browser.getCurrentUrl()).toEqual('http://localhost:8800/adminapp#!/product');
        });
      });

      it('Shoud add the product while clicking on add product', function () {
          element(by.css('[ng-click="vm.addProduct()"]')).click();
          element(by.model('vm.item.name')).sendKeys("Dell");
          element(by.model('vm.item.price')).sendKeys(1000);
          element(by.model('vm.item.category')).sendKeys("Computer");
          element(by.model('vm.item.available')).sendKeys(10);
          element(by.model('vm.item.description')).sendKeys("Dell Inc. is a multinational computer technology company based in Round Rock, Texas, that develops, sells, repairs, and supports computers and related products and services.");
          element(by.css('[ng-click="vm.add()"]')).click();
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
