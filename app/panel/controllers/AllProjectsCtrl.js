(function() {
  'use strict';
  var AllProjectsCtrl = function($scope, projectsService) {
    $scope.allProjects = null;
    $scope.pageNo = null;

    function init() {
      projectsService.getProjects()
      .success(function (projects) {
        $scope.allProjects = projects;
      })
      .error(function (response) {
        console.log(response);
      });
    }

    $scope.loadWithParam = function() {
      projectsService.getProjects($scope.pageNo).success(function (projects) {
        $scope.allProjects = projects;
      });
    };

    init();
  };

  AllProjectsCtrl.$inject = ['$scope', 'projectsService'];
  angular.module('panelModule').controller('AllProjectsCtrl', AllProjectsCtrl);

}());
