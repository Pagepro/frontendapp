(function() {
  'use strict';
  var authInterceptor = function($rootScope, $q, $window, $location) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if ($window.localStorage.token) {
          config.headers.Authorization = 'Token ' + $window.localStorage.token;
        }
        return config;
      },
      responseError: function(response) {
        if (response.status === 401) {
          $window.localStorage.removeItem('token');
          $window.localStorage.removeItem('username');
          $location.path('/');
          return;
        }
        return $q.reject(response);
      }
    };
  };

  authInterceptor.$inject = ['$rootScope', '$q', '$window', '$location'];
  angular.module('frontendApp').factory('authInterceptor', authInterceptor);

}());
