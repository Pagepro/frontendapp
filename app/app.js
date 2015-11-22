(function() {
  'use strict';

  var frontendApp = angular.module('frontendApp', ['ui.router', 'ngAnimate', 'offClick', 'authModule', 'panelModule', 'dibari.angular-ellipsis']);
  frontendApp
    .config(['$urlRouterProvider',
      '$httpProvider',
      '$locationProvider',
      function($urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
        $urlRouterProvider.otherwise('/auth/login');
      }
    ])
    .run(['$state',
      '$rootScope',
      function($state, $rootScope) {
        // todo
        // here's a place to check whether a user is logged in
        // if so, redirect him to his projects,
        // else, redirect to login
        // if (true) {
        $state.go('accountState.login');
        // } else {
        // $state.go('homeState');
        // }
        $rootScope.$on('$stateChangeSuccess', function(event, data) {
          $rootScope.pageName = data.pageName;
          $rootScope.module = data.module;
          $rootScope.trails = data.trails;
          $rootScope.isAuth = (data.module === 'auth');

          $rootScope.displayTitle = data.displayTitle;
        });
        $rootScope.communicator = {};
      }
    ]);

}());
