'use strict';

angular.module('gape', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'gape.templateCache'
])

.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/login', {
            templateUrl: 'login/page.html',
            controller: 'LoginController'
        })
        .otherwise('/login');
});
