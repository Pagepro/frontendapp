(function() {
  'use strict';
  var RegistrationCtrl = function($scope, authService, toaster) {
    $scope.errors = [];
    $scope.save = function(user) {
      if($scope.registrationForm.$valid) {
        authService.registerUser(user).success(function () {
          $scope.errors = [];
          toaster.pop('success', 'Success!', 'Your account has been successfully created. Now you only have to wait until it\'s approved by one of our staff members!');
        })
        .error(function (response) {
          _.each(response, function (fieldResponse) {
            _.each(fieldResponse, function (responseText) {
              $scope.errors.push(responseText);
            });
          });
        });
      }
    };
  };

  RegistrationCtrl.$inject = ['$scope', 'authService', 'toaster'];
  angular.module('frontendApp').controller('RegistrationCtrl', RegistrationCtrl);

}());
