(function() {
  'use strict';
  var AccountCtrl = function($scope, $state) {
    // fixme
    // we need to consider cases with and without '/'
    if ($state.current.url === '/account' || $state.current.url === '/auth') {
      $state.go('accountState.login');
    }
  };

  AccountCtrl.$inject = ['$scope', '$state'];
  angular.module('frontendApp').controller('AccountCtrl', AccountCtrl);

}());
