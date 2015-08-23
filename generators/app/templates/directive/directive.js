'use strict';

angular.module('aee.my-module', [])
  .directive('myDirective', function() {
    return {
      templateUrl: 'src/my-directive.html',
    };
  });