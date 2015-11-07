'use strict';

describe('<%= name %>', function () {
<% if (mod) { -%>
  var templateCache;
  var $document;
  var compile;
  var scope;

  beforeEach(module('<%= name %>'));
  beforeEach(inject(function ($rootScope, $templateCache, _$document_, $compile) {
    scope = $rootScope.$new();
    templateCache = $templateCache;
    $document = _$document_;
    compile = $compile;
  }));
<% } -%>

  it('should ...', function () {

  });

<% if (mod) { -%>
  afterEach(function () {
    angular.element('body').empty();
  });
<% } -%>
});
