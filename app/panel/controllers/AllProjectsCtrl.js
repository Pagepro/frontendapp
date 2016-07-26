(function() {
  'use strict';
  var AllProjectsCtrl = function($scope, projectsService, spinnerService,
    allProjects) {

    $scope.finishedFetching = true;
    $scope.allProjects = allProjects.data.results;

    $scope.init = function () {

    }

  };

  AllProjectsCtrl.$inject = ['$scope', 'projectsService', 'spinnerService', 'allProjects'];
  angular.module('panelModule').controller('AllProjectsCtrl', AllProjectsCtrl);

}());
