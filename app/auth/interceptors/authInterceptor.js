(function() {
  'use strict';
  var authInterceptor = function($q, $window, $location, loaderFactory) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if ($window.localStorage.token) {
          config.headers.Authorization = 'Token ' + $window.localStorage.token;
        }
        loaderFactory.createLoader();
        return config;
      },
      responseError: function(response) {
        if (response.status === 401) {
          $window.localStorage.removeItem('token');
          $window.localStorage.removeItem('username');
          $location.path('/');
          loaderFactory.removeLoader();
          return;
        }
        return $q.reject(response);
      }
    };
  };

  authInterceptor.$inject = ['$q', '$window', '$location', 'loaderFactory'];
  angular.module('frontendApp').factory('authInterceptor', authInterceptor);

}());
