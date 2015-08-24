'use strict';

describe('Service', function() {

	beforeEach(module('AdrienEtienne.my-module'));

	var myService;
	beforeEach(inject(function(_myService_) {
		myService = _myService_;
	}));

	it('Should return "Hello you!"', function() {
		myService().should.equal('Hello you!');
	});
});
