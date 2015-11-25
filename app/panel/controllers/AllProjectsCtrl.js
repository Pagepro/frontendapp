(function() {
  'use strict';
  var AllProjectsCtrl = function($scope, projectsService) {
    $scope.allProjects = null;
    $scope.pageNo = null;
    $scope.service = projectsService.getProjects;

    function init() {
      projectsService.getProjects()
      .success(function (projects) {
        $scope.allProjects = projects;
      })
      .error(function (response) {
        console.log(response);
      });
    }


    init();
  };

  AllProjectsCtrl.$inject = ['$scope', 'projectsService'];
  angular.module('panelModule').controller('AllProjectsCtrl', AllProjectsCtrl);

}());
