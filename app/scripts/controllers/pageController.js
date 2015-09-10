(function() {
  'use strict';
  var PageController = function($scope, $state) {
    console.log($state);
    $scope.currentPage = $state.pageName;
  };

  PageController.$inject = ['$scope', '$state'];
  angular.module('frontendApp').controller('PageController', PageController);

}());
