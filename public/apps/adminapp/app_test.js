'use strict';

describe('admin app', function () {
  it('should proceed to the admin app site', function () {
    browser.get('http://localhost:8800/adminapp')
      .then(function () {
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8800/adminapp#!/');
      })
    });
  });
