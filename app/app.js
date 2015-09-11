(function() {
  'use strict';

  // var loginModule = angular.module('loginModule', ['ui.router']);
  // loginModule.config(function($stateProvider) {});

  var frontendApp = angular.module('frontendApp', ['ui.router']);


  frontendApp
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/auth/login');
    $stateProvider
      .state('accountState', {
        url: '/auth',
        templateUrl: 'partials/templates/auth/account.html',
        controller: 'AccountController',
        controllerAs: 'AC',
        pageName: 'Account'
      })
      .state('accountState.login', {
        url: '/login',
        templateUrl: 'partials/templates/auth/login.html',
        controller: 'LoginController',
        controllerAs: 'LC',
        pageName: 'Login'
      })
      .state('accountState.register', {
        url: '/register',
        templateUrl: 'partials/templates/auth/registration.html',
        controller: 'RegistrationController',
        controllerAs: 'RC',
        pageName: 'Register'
      })
      // logged in
      .state('myProjectsState', {
        url: '/myProjects',
        templateUrl: 'partials/templates/panel/myProjects.html',
        controller: 'MyProjectsController',
        controllerAs: 'MPC',
        pageName: 'My Projects'
      });
  })
  .run(function ($state, $rootScope) {
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
      $rootScope.showBodyBackground = (data.name.indexOf('accountState') > -1);
    });
    $rootScope.communicator = {};
  });

}());
