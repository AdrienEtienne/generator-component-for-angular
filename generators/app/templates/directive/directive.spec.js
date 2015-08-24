'use strict';

describe('Directive', function() {

  // load the directive's module and view
  beforeEach(module('AdrienEtienne.my-module'));
  beforeEach(module('src/directive/my-directive.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('Doit afficher My Directive', inject(function($compile) {
    element = angular.element('<my-directive></my-directive>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('My directive');
  }));
});
