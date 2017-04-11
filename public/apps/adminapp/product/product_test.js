'use strict';

 describe('Product module Test case', function () {

  it('should lead to the Add product component', function () {
    browser.get('http://localhost:8800/adminapp#!/product');
    browser.waitForAngular();
    
    var producttitle = element(by.model('vm.item.name'));
    var productprice =  element(by.model('vm.item.price'));
    var productdescription = element(by.model('vm.item.description'));
    var productavailable = element(by.model('vm.item.available'));
    var productcategory = element(by.model('vm.item.category'));
    var addProductButton = element(by.css('md-raised md-primary'));

    function addProduct(title,price,category,quantity,description) {
        producttitle.sendKeys(title);
        productprice.sendKeys(price);
        productcategory.sendKeys(category);
        productavailable.sendKeys(quantity);
        productdescription.sendKeys(description)
        addProductButton.click();
    }

      addProduct("Dell","1000","Computer","5","Dell Inc. is a multinational computer technology company based in Round Rock, Texas, that develops, sells, repairs, and supports computers and related products and services.");
      element.all(by.css(".item a.gc-exercises-link")).then(function(Product) {

      for (i = 0; i < Product.length; i++) {
        Product[i].getText().then(function(text) {
          console.log(text);

        });
      };
    });
    });
  });
