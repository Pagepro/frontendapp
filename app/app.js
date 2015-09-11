(function() {
  'use strict';

  var frontendApp = angular.module('frontendApp', ['ui.router', 'offClick', 'authModule', 'panelModule']);
  frontendApp
  .config(['$urlRouterProvider',
           '$locationProvider',
    function ($urlRouterProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/auth/login');
  }])
  .run(['$state',
        '$rootScope',
    function ($state, $rootScope) {
    // todo
    // here's a place to check whether a user is logged in
    // if so, redirect him to his projects,
    // else, redirect to login
    if (true) {
      // $state.go('accountState.login');
    } else {
      $state.go('homeState');
    }
    $rootScope.$on('$stateChangeSuccess', function (event, data) {
      $rootScope.pageName = data.pageName;
      $rootScope.module = data.module;
      $rootScope.showBodyBackground = (data.module === 'auth');
    });
    $rootScope.communicator = {};
  }]);

}());
