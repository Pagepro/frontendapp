(function() {
  'use strict';
  var LoginCtrl = function($scope, $state) {

    $scope.submitForm = function () {
      $state.go('myProjectsState');
    };
  };

  LoginCtrl.$inject = ['$scope', '$state'];
  angular.module('frontendApp').controller('LoginCtrl', LoginCtrl);

}());
