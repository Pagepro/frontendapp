(function() {
  'use strict';
  var LoginCtrl = function($scope, $state, authService) {
    $scope.login = function (user) {
      authService.loginUser(user.email, user.password).success(function (authToken) {
        authService.setAuthToken(authToken.token);
        $state.go('myProjectsState');
      });
    };
  };

  LoginCtrl.$inject = ['$scope', '$state', 'authService'];
  angular.module('frontendApp').controller('LoginCtrl', LoginCtrl);

}());
