'use strict';

angular.module('AdrienEtienne.my-module')
	.service('myService', [function() {
		return function() {
			return 'Hello you!';
		};
	}]);
