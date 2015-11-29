(function() {
  'use strict';
  var authModule = angular.module('authModule', []);

  authModule
    .config(['$stateProvider', function($stateProvider) {
      $stateProvider
        .state('accountState', {
          url: '/auth',
          templateUrl: 'app/auth/templates/account.html',
          controller: 'AuthCtrl',
          controllerAs: 'AC',
          pageName: 'Account',
          module: 'auth'
        })
        .state('accountState.login', {
          url: '/login',
          templateUrl: 'app/auth/templates/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'LC',
          pageName: 'Login',
          module: 'auth'
        })
        .state('accountState.register', {
          url: '/register',
          templateUrl: 'app/auth/templates/registration.html',
          controller: 'RegistrationCtrl',
          controllerAs: 'RC',
          pageName: 'Register',
          module: 'auth'
        })
        .state('accountState.remindState', {
          url: '/remind',
          templateUrl: 'app/auth/templates/remind.html',
          controller: 'RemindCtrl',
          controllerAs: 'RmC',
          pageName: 'Remind Password',
          module: 'auth',
          displayTitle: true
        });
    }]);
}());
