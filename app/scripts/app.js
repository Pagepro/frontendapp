(function() {
  'use strict';

  // var loginModule = angular.module('loginModule', ['ui.router']);
  // loginModule.config(function($stateProvider) {});

  var frontendApp = angular.module('frontendApp', ['ui.router']);


  frontendApp
  .config(function ($stateProvider) {
    $stateProvider
      .state('homeState', {
        url: '/',
        templateUrl: 'app/templates/home.html',
        controller: 'HomeController',
        controllerAs: 'HC'
      })
      .state('accountState', {
        url: '/account',
        templateUrl: 'app/templates/account/general.html',
        controller: 'AccountController',
        controllerAs: 'AC'
      })
      .state('accountState.login', {
        url: '/login',
        templateUrl: 'app/templates/account/loginForm.html',
        controller: 'LoginController',
        controllerAs: 'LogC'
      });
  })
  .run(function ($state, $rootScope) {
    $state.go('homeState');
    $rootScope.communicator = {};
  });

}());
