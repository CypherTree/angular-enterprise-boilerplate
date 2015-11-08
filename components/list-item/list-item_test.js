'use strict';

describe('list-item', function () {
  var templateCache;
  var $document;
  var compile;
  var scope;

  beforeEach(module('list-item'));
  beforeEach(inject(function ($rootScope, $templateCache, _$document_, $compile) {
    scope = $rootScope.$new();
    templateCache = $templateCache;
    $document = _$document_;
    compile = $compile;
  }));

  it('should ...', function () {

  });

  afterEach(function () {
    angular.element('body').empty();
  });
});
