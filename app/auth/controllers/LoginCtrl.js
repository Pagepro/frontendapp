(function() {
  'use strict';
  var LoginCtrl = function($scope, $state, $window, authService) {
    $scope.submitForm = function () {
      authService.loginUser('tes', 't').success(function (authToken) {
        $window.localStorage.token = authToken;
        $state.go('myProjectsState');
      });
    };
  };

  LoginCtrl.$inject = ['$scope', '$state', '$window', 'authService'];
  angular.module('frontendApp').controller('LoginCtrl', LoginCtrl);

}());
