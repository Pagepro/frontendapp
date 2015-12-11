(function() {
  'use strict';

  var frontendApp = angular.module('frontendApp', ['ui.router', 'ngAnimate', 'offClick', 'authModule', 'panelModule',
    'dibari.angular-ellipsis', 'ui.sortable', 'angularSpinners'
  ]);
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
        $state.go('myProjectsState');
        $rootScope.$on('$stateChangeSuccess', function(event, data) {
          $rootScope.pageName = data.pageName;
          $rootScope.module = data.module;
          $rootScope.trails = data.trails;
          $rootScope.isAuth = (data.module === 'auth');

          $rootScope.displayTitle = data.displayTitle;
        });
      }
    ]);

}());
