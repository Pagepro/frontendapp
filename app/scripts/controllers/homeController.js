(function() {
  'use strict';
  var HomeController = function($scope) {
    $scope.data = 'lol';
  };

  HomeController.$inject = ['$scope'];
  angular.module('frontendApp').controller('HomeController', HomeController);

}());
