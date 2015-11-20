(function() {
  'use strict';
  var LoginCtrl = function($scope, $state, $window, auth) {
    $scope.submitForm = function () {
      auth.loginUser('tes', 't').success(function (authToken) {
        $window.localStorage.token = authToken;
        $state.go('myProjectsState');
      });
    };
  };

  LoginCtrl.$inject = ['$scope', '$state', '$window', 'auth'];
  angular.module('frontendApp').controller('LoginCtrl', LoginCtrl);

}());
