(function() {
  'use strict';
  var AccountController = function($scope, $state) {
    // fixme
    // we need to consider cases with and without '/'
    if ($state.current.url === '/account') {
      $state.go('accountState.login');
    }
  };

  AccountController.$inject = ['$scope', '$state'];
  angular.module('frontendApp').controller('AccountController', AccountController);

}());
