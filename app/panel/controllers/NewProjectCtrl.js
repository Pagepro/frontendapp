(function() {
  'use strict';
  var NewProjectCtrl = function($scope) {
    $scope.init = function() {
      console.log('dummy-text');
    };
    $scope.init();

  };

  NewProjectCtrl.$inject = ['$scope'];
  angular.module('panelModule').controller('NewProjectCtrl', NewProjectCtrl);

}());
