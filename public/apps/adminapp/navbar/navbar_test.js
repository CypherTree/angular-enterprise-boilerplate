'use strict';
var request = require('request');
 describe('Navbar module : Logout Test case', function () {
        function login(){
          element(by.model('vm.form.email')).sendKeys('anitrai011@gmail.com');
          element(by.model('vm.form.password')).sendKeys('s152406011');
          element(by.css("button[type='submit']")).click();
        }
       beforeEach(function() {
         browser.get('http://localhost:8800/adminapp#!/');
       });
       it('Logout will redirect it to Login page', function() {
         login();
         element(by.css("[ng-click='vm.logout()']")).click();
         expect(browser.getCurrentUrl()).toEqual('http://localhost:8800/adminapp#!/')
       });
  });
