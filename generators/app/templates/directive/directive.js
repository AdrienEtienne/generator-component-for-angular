'use strict';

angular.module('AdrienEtienne.my-module', [])
  .directive('myDirective', function() {
    return {
      templateUrl: 'src/my-directive.html',
    };
  });