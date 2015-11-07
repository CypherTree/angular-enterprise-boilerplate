'use strict';

describe('sc-translate', function () {
  var $document;

  beforeEach(function () {
    window.locales = {};
    window.locales.en = {
      'ABOUT': 'We are testing sc-translate'
    };
  });
  beforeEach(module('sc-translate'));
  beforeEach(inject(function ($rootScope, _$document_, $compile) {
    $document = _$document_;

    var tpl = [
      '<div class="translate">',
      '  {{ \'ABOUT\' | translate }}',
      '</div>'
    ].join('');

    var elm = angular.element(tpl);
    angular.element('body').append(elm);
    $compile(elm)($rootScope);
    $rootScope.$digest();
  }));

  it('should translate the given key', function () {
    expect($document.find('.translate').text()).toContain('We are testing sc-translate');
  });
});
