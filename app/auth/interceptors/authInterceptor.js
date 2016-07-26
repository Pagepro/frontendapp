(function() {
  'use strict';
  var authInterceptor = function($q, $window, $location, appSettings) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        config.unique = true;
        if ($window.localStorage.token) {
          config.headers.Authorization = 'Token ' + $window.localStorage.token;
        }
        return config;
      },
      responseError: function(response) {
        if (response.status === 401 || response.status === 403) {
          $window.localStorage.removeItem('token');
          $window.localStorage.removeItem('username');
          // temp

          $window.location.href = appSettings.redirectionUrl || 'http://frontendapp.com/';
          // $location.path('/');
          return;
        }
        if (response.status === 404) {
          // spinnerService.hideGroup('full-page');
          // toaster.pop('error', 'Sorry!', 'The page you\'re trying to access does not exist. Please try again.');
          // if ($window.localStorage.token) {
          //   $location.path('/my-projects');
          // } else {
          //   $location.path('/');
          // }

        }
        return $q.reject(response);
      }
    };
  };

  authInterceptor.$inject = ['$q', '$window', '$location', 'appSettings'];
  angular.module('frontendApp').factory('authInterceptor', authInterceptor);

}());
