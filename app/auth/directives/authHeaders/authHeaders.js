(function() {
  'use strict';

  var authHeaders = function () {
    return {
      restrict: 'E',
      templateUrl: 'app/auth/directives/authHeaders/authHeaders.html'
    };
  };

  authHeaders.$inject = [];
  angular.module('authModule').directive('authHeaders', authHeaders);

}());
