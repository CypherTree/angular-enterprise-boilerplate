'use strict';
var request = require('request');
 describe('Account module : Login Test case', function () {
        function login(){
          element(by.model('vm.form.email')).sendKeys('anitrai011@gmail.com');
          element(by.model('vm.form.password')).sendKeys('s152406011');
          element(by.css("button[type='submit']")).click();
        }
       beforeEach(function() {
         browser.get('http://localhost:8800/adminapp#!/');
       });
       it('Verify that the user is logged in', function() {
         login();
         browser.driver.wait(function() {
             return browser.driver.getCurrentUrl().then(function(url) {
                 return url;
             });
         },100000);
         expect(browser.getCurrentUrl()).toEqual('http://localhost:8800/adminapp#!/product');
       });
  });
  describe('Account module : Register Test case', function () {
     beforeEach(function() {
        browser.get('http://localhost:8800/adminapp#!');
     });
    it('User Registration ', function() {
       element(by.css('[ui-sref="register"]')).click();
       element(by.model('vm.user.first_name')).sendKeys('Cyphertree');
       element(by.model('vm.user.last_name')).sendKeys('Cyphertree');
       element(by.model('vm.user.email')).sendKeys('Cyphertree'+Date.now()+'@gmail.com');
       element(by.model('vm.user.new_password')).sendKeys('Cyphertree');
       element(by.model('vm.user.verify_password')).sendKeys('Cyphertree');
       element(by.css("button[type='submit']")).click();
       browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                console.log(url);
                  return url;
              });
        },100000);
             expect(browser.getCurrentUrl()).toEqual('http://localhost:8800/adminapp#!/');
         });
  });
  describe("Account module - Rest api", function() {
      beforeEach(function() {
          var jar = request.jar();
          var req = request.defaults({
              jar : jar
      });
          function getLogin(url, params) {
              var defer = protractor.promise.defer();
              req.post(url, params , function(error, message) {
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
          function getRegister(option) {
              var defer = protractor.promise.defer();
              req.post(option, function(error, message,body) {
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

          function getUserLogin() {
            let inputJson ={
              "email":"anitrai011@gmail.com",
              "password":"s152406011"
            }
            var option = {
              url:'https://ft-anitrai011.vz2.dreamfactory.com/api/v2/system/admin/session',
              headers:{ 'X-DreamFactory-Api-Key': '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88'},
              body : inputJson,
              json:true
            }
              return getLogin(option);
            };

          function getUserRegister() {
            let inputJson ={
              "first_name":"cyphertree",
              "last_name":"cyphertree",
              "new_password":"cyphertree",
              "verify_password":"cyphertree",
              "email":Date.now()+'@gmail.com'
            }
            var option = {
              url:'https://ft-anitrai011.vz2.dreamfactory.com/api/v2/user/register?login=false',

              body : inputJson,
              json:true
            }
              return getRegister(option);
            };


          var flow = protractor.promise.controlFlow();
            flow.execute(getUserLogin);
            flow.execute(getUserRegister);

      });

      it("should do something ", function() {
          expect(2).toEqual(2);
      });
  });
