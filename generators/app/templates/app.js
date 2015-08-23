'use strict';

angular.module('myApp', [
  'ngRoute',
  'AdrienEtienne.my-module'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(false);

  $routeProvider.when('/home', {
    templateUrl: '/page/home.html'
  });

  $routeProvider.otherwise({
    redirectTo: '/home'
  });

}]);