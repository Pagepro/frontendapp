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
        controllerAs: 'HC',
        pageName: 'Home Page'
      })
      .state('accountState', {
        url: '/auth',
        templateUrl: 'app/templates/account/general.html',
        controller: 'AccountController',
        controllerAs: 'AC',
        pageName: 'Account'
      })
      .state('accountState.login', {
        url: '/login',
        templateUrl: 'app/templates/account/loginForm.html',
        controller: 'LoginController',
        controllerAs: 'LC',
        pageName: 'Login'
      })
      .state('accountState.register', {
        url: '/register',
        templateUrl: 'app/templates/account/registrationForm.html',
        controller: 'RegistrationController',
        controllerAs: 'RC',
        pageName: 'Register'
      });
  })
  .run(function ($state, $rootScope) {
    // todo
    // here's a place to check whether a user is logged in
    // if so, redirect him to his projects,
    // else, redirect to login
    if (true) {
      $state.go('accountState.login');
    } else {
      $state.go('homeState');
    }
    $rootScope.$on('$stateChangeSuccess', function (event, data) {
      $rootScope.pageName = data.pageName;
    });
    $rootScope.communicator = {};
  });

}());
