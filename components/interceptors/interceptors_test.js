'use strict';

describe('sc-interceptors', function () {
  var scope;
  var req;
  var httpBackend;
  var http;
  var $document;

  beforeEach(function () {
    window.CONFIG = {};
    window.CONFIG.token = 'secret';
  });

  beforeEach(module('sc-alerts')); // dep
  beforeEach(module('sc-interceptors'));
  beforeEach(inject(function ($rootScope, $httpBackend, $http, _$document_) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    http = $http;
    $document = _$document_;
  }));

  it('should inject window.CONFIG.token to every GET request', function () {
    http.get('/url');

    httpBackend.whenGET('/url', function (headers) {
      expect(headers['x-auth-token']).toBeDefined();
      expect(headers['x-auth-token']).toBe('secret');
      return headers['x-auth-token'];
    }).respond(200, { data: 1 });
    httpBackend.flush();
  });

  it('should inject window.CONFIG.token to every POST request', function () {
    http.post('/url');

    httpBackend.whenPOST('/url', function (headers) {
      expect(headers['x-auth-token']).toBeDefined();
      expect(headers['x-auth-token']).toBe('secret');
      return headers['x-auth-token'];
    }).respond(200, { data: 1 });
    httpBackend.flush();
  });

  it('should display notifications for 4xx errors', function () {
    http.get('/url');
    httpBackend.whenGET('/url').respond(404, { message: 'not found' });
    httpBackend.flush();
    var error = $document.find('body').text();
    expect(error).toContain('not found');
  });

  afterEach(function () {
    angular.element('body').empty();
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
});
