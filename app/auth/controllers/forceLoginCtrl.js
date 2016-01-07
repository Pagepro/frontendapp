(function() {
  'use strict';

  var forceLoginCtrl = function($state, $stateParams, authService) {
    authService.setAuthToken($stateParams.token);
    $state.go('myProjectsState');
  };

  forceLoginCtrl.$inject = ['$state', '$stateParams', 'authService'];
  angular.module('frontendApp').controller('forceLoginCtrl', forceLoginCtrl);

}());
