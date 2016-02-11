(function() {
  'use strict';
  var AllProjectsCtrl = function($scope, projectsService, spinnerService) {
    $scope.allProjects = null;
    $scope.pageNo = null;
    $scope.finishedFetching = false;
    $scope.service = projectsService.getProjects;

    $scope.init = function() {
      spinnerService.show('all-projects');
      $scope.service(null, 'all')
        .success(function(projects) {
          $scope.allProjects = projects.results;
          $scope.pagination = {
            count: projects.count,
            next: projects.next,
            previous: projects.previous
          };
        })
        .error(function() {})
        .finally(function() {
          $scope.finishedFetching = true;
          spinnerService.hide('all-projects');
        });
    };

  };

  AllProjectsCtrl.$inject = ['$scope', 'projectsService', 'spinnerService'];
  angular.module('panelModule').controller('AllProjectsCtrl', AllProjectsCtrl);

}());
