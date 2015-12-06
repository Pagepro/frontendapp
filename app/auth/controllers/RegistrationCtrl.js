(function() {
  'use strict';
  var RegistrationCtrl = function($scope, authService) {
    $scope.error = false;
    $scope.save = function(user) {
      if($scope.registrationForm.$valid) {
        authService.registerUser(user).success(function (resp) {
          console.log(resp);
        })
        .error(function (response) {
          $scope.error = response;
        });
      }
    };
  };

  RegistrationCtrl.$inject = ['$scope', 'authService'];
  angular.module('frontendApp').controller('RegistrationCtrl', RegistrationCtrl);

}());
