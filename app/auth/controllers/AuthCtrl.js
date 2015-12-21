(function() {
  'use strict';
  var AuthCtrl = function($scope, $state) {
    // fixme
    // we need to consider cases with and without '/'
    if ($state.current.url === '/account' || $state.current.url === '/auth') {
      $state.go('accountState.login');
    }
  };

  AuthCtrl.$inject = ['$scope', '$state'];
  angular.module('frontendApp').controller('AuthCtrl', AuthCtrl);

}());
