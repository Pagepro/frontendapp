(function() {
  'use strict';
  var LoginController = function($scope, $state) {

    $scope.submitForm = function () {
      $state.go('myProjectsState');
    };

  };

  LoginController.$inject = ['$scope', '$state'];
  angular.module('frontendApp').controller('LoginController', LoginController);

}());
