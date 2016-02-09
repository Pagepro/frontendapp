(function () {
  'use strict';

  var accountService = function ($http, appSettings) {
    this.getUserData = function () {
      return $http.get(appSettings.apiRoot + 'accounts/my/');
    };
  };

  accountService.$inject = ['$http', 'appSettings'];
  angular.module('frontendApp').service('accountService', accountService);
}());
