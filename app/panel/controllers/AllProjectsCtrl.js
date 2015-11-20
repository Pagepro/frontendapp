(function() {
  'use strict';
  var AllProjectsCtrl = function($scope, projectsFactory) {
    $scope.allProjects = null;
    $scope.pageNo = null;

    function init() {
      projectsFactory.getProjects()
      .success(function (projects) {
        $scope.allProjects = projects;
      })
      .error(function (response) {
        console.log(response);
      });
    }

    $scope.loadWithParam = function() {
      projectsFactory.getProjects($scope.pageNo).success(function (projects) {
        $scope.allProjects = projects;
      });
    };

    init();
  };

  AllProjectsCtrl.$inject = ['$scope', 'projectsFactory'];
  angular.module('panelModule').controller('AllProjectsCtrl', AllProjectsCtrl);

}());
