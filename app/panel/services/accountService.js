(function () {
  'use strict';

  var accountService = function ($http, appSettings) {
    var user = $http.get(appSettings.apiRoot + 'accounts/my/');
    return {
      getUserData: function () {
        return user;
      }
    };
  };

  accountService.$inject = ['$http', 'appSettings'];
  angular.module('frontendApp').factory('accountService', accountService);
}());
