(function() {
  'use strict';
  var MyProjectsCtrl = function($scope, projectsService, spinnerService, appSettings) {
    $scope.myProjects = null;
    $scope.finishedFetching = false;
    $scope.screenshotRoot = appSettings.screenshotRoot(239, 242);

    $scope.init = function() {
      spinnerService.show('my-projects');
      projectsService.getProjects(null, 'active')
        .success(function(resp) {
          $scope.myProjects = resp.results;
        })
        .error(function() {})
        .finally(function() {
          $scope.finishedFetching = true;
          spinnerService.hide('my-projects');
        });
    };
  };

  MyProjectsCtrl.$inject = ['$scope', 'projectsService', 'spinnerService', 'appSettings'];
  angular.module('panelModule').controller('MyProjectsCtrl', MyProjectsCtrl);

}());
