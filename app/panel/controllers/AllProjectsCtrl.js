(function() {
  'use strict';
  var AllProjectsCtrl = function($scope, projectsService) {
    $scope.allProjects = null;
    $scope.pageNo = null;
    $scope.service = projectsService.getProjects;

    function init() {
      $scope.service()
      .success(function (projects) {
        $scope.allProjects = projects.results;
        $scope.pagination = {
          count: projects.count,
          next: projects.next,
          previous: projects.previous
        }
      })
      .error(function (response) {
        //
      });
    }
    init();
  };

  AllProjectsCtrl.$inject = ['$scope', 'projectsService'];
  angular.module('panelModule').controller('AllProjectsCtrl', AllProjectsCtrl);

}());
