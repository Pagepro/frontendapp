(function() {
  'use strict';

  var frontendApp = angular.module('frontendApp', ['panelModule', 'ui.router', 'ngAnimate', 'offClick',
    'dibari.angular-ellipsis', 'as.sortable', 'angularSpinners', 'toaster', 'ngFileUpload'
  ]);
  frontendApp
    .config(['$urlRouterProvider',
      '$httpProvider',
      '$locationProvider',
      function($urlRouterProvider, $httpProvider, $locationProvider) {
        $httpProvider.interceptors.push('authInterceptor');
        // $urlRouterProvider.otherwise('/auth/login');
        $urlRouterProvider.otherwise('/my-projects');
      }
    ])
    .run(['$state',
      '$rootScope',
      function($state, $rootScope) {
        $state.go('myProjectsState');
        $rootScope.$on('$stateChangeSuccess', function(event, data) {
          // cross-browser scroll top hack
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          $rootScope.pageName = data.pageName;
          $rootScope.module = data.module;
          $rootScope.trails = data.trails;
          $rootScope.isAuth = (data.module === 'auth');

          $rootScope.displayTitle = data.displayTitle;
        });
      }
    ]);

}());
