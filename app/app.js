(function() {
  'use strict';

  var frontendApp = angular.module('frontendApp', ['ui.router', 'ngAnimate', 'offClick', 'panelModule',
    'dibari.angular-ellipsis', 'as.sortable', 'angularSpinners', 'toaster', 'ngFileUpload'
  ]);
  frontendApp
    .config(['$urlRouterProvider',
      '$httpProvider',
      function($urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
        // $urlRouterProvider.otherwise('/auth/login');
        $urlRouterProvider.otherwise('/my-projects');
      }
    ])
    .run(['$state',
      '$rootScope',
      'spinnerService',
      '$timeout',
      function($state, $rootScope, spinnerService, $timeout) {
        // $state.go('myProjectsState');
        $rootScope.$on('$stateChangeStart', function (data, data2, data3) {
          // no "global" spinner registered hack
          $timeout(function () {
            spinnerService.show('global');
          }, 0);
        });
        $rootScope.$on('$stateChangeSuccess', function(event, data) {
          if (!$rootScope.preventAutoScroll) {
            // cross-browser hack
            document.body.scrollTop = document.documentElement.scrollTop = 0;
          } else {
            $rootScope.preventAutoScroll = false;
          }

          $rootScope.pageName = data.pageName;
          $rootScope.module = data.module;
          $rootScope.trails = data.trails;
          $rootScope.isAuth = (data.module === 'auth');

          $rootScope.displayTitle = data.displayTitle;
          spinnerService.hide('global');

        });
      }
    ]);

}());
