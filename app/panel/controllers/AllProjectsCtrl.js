(function() {
  'use strict';
  var AllProjectsCtrl = function($scope, allProjects) {
    $scope.allProjects = allProjects.data.results;
  };

  AllProjectsCtrl.$inject = ['$scope', 'allProjects'];
  angular.module('panelModule').controller('AllProjectsCtrl', AllProjectsCtrl);

}());
