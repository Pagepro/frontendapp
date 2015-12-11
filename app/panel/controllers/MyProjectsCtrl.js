(function() {
  'use strict';
  var MyProjectsCtrl = function($scope, projectsService, spinnerService) {
    $scope.myProjects = null;
    $scope.init = function() {
      spinnerService.show('my-projects');
      projectsService.getProjects(null, 'active')
        .success(function(resp) {
          $scope.myProjects = resp.results;
        })
        .error(function() {})
        .finally(function() {
          spinnerService.hide('my-projects');
        });
    };
  };

  MyProjectsCtrl.$inject = ['$scope', 'projectsService', 'spinnerService'];
  angular.module('panelModule').controller('MyProjectsCtrl', MyProjectsCtrl);

}());
