(function () {
  'use strict';
  var authModule = angular.module('authModule', []);
  authModule
  .config(['$stateProvider', function ($stateProvider) {
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
      });
  }]);
}());
