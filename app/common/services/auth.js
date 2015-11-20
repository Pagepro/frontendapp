(function() {
  'use strict';

  var auth = function($http, appSettings) {
    var baseApiUrl = appSettings.apiRoot;
    console.log(baseApiUrl);
    return {
      loginUser: function(username, password) {
        return $http.post(baseApiUrl + 'auth', {
          username: username,
          password: password
        });
      }
    };
  };

  auth.$inject = ['$http', 'appSettings'];
  angular.module('frontendApp').factory('auth', auth);

}());
