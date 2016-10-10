(function() {
  'use strict';
  var authService = function($http, $q, $window, appSettings) {
    var baseApiUrl = appSettings.apiRoot;
    var baseUrl = appSettings.redirectionUrl;

    this.loginUser = function(username, password) {
      return $http.post(baseApiUrl + 'auth/', {
        username: username,
        password: password
      });
    };
    this.setAuthToken = function (token) {
      $window.localStorage.token = token;
    };
    this.registerUser = function (user) {
      return $http.post(baseApiUrl + 'accounts/', user);
    };
    this.logout = function () {
      $http.delete(baseApiUrl + 'auth/').then(function(response) {
        console.log(response);
        $window.localStorage.removeItem('token');
        $window.location.href = appSettings.redirectionUrl + 'logout/';
      });
    };
  };

  authService.$inject = ['$http', '$q', '$window', 'appSettings'];
  angular.module('frontendApp').service('authService', authService);

}());
