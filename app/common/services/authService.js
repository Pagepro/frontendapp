(function() {
  'use strict';

  var authService = function($http, $window, appSettings) {
    var baseApiUrl = appSettings.apiRoot;

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
      $window.localStorage.removeItem('token');
    };
  };

  authService.$inject = ['$http', '$window', 'appSettings'];
  angular.module('frontendApp').service('authService', authService);

}());
