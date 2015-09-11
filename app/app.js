(function() {
  'use strict';

  // var loginModule = angular.module('loginModule', ['ui.router']);
  // loginModule.config(function($stateProvider) {});

  var frontendApp = angular.module('frontendApp', ['ui.router', 'offClick']);


  frontendApp
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/auth/login');
    $stateProvider
      .state('accountState', {
        url: '/auth',
        templateUrl: 'partials/templates/auth/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'AC',
        pageName: 'Account',
        module: 'auth'
      })
      .state('accountState.login', {
        url: '/login',
        templateUrl: 'partials/templates/auth/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'LC',
        pageName: 'Login',
        module: 'auth'
      })
      .state('accountState.register', {
        url: '/register',
        templateUrl: 'partials/templates/auth/registration.html',
        controller: 'RegistrationCtrl',
        controllerAs: 'RC',
        pageName: 'Register',
        module: 'auth'
      })
      // dashboard
      .state('myProjectsState', {
        url: '/my-projects',
        templateUrl: 'partials/templates/panel/myProjects.html',
        controller: 'MyProjectsCtrl',
        controllerAs: 'MPC',
        pageName: 'My Projects',
        module: 'panel'
      })
      .state('projectState', {
        url: '/project/:projectId',
        templateUrl: 'partials/templates/panel/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'PC',
        pageName: 'Project',
        module: 'panel'
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
      $rootScope.module = data.module;
      $rootScope.showBodyBackground = (data.module === 'auth');
    });
    $rootScope.communicator = {};
  });

}());
