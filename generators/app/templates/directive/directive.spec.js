'use strict';

describe('aee.my-module', function() {

  // load the directive's module and view
  beforeEach(module('aee.my-module'));
  beforeEach(module('src/my-directive.html'));

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