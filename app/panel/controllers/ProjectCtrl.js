(function() {
  'use strict';
  var ProjectCtrl = function($scope, $q, $stateParams, projectsFactory, templatesFactory, filesFactory, statusService) {
    var projectDfd = $q.defer();
    var templatesDfd = $q.defer();
    var filesDfd = $q.defer();

    $scope.project = null;
    $scope.displayType = 'grid';

    $scope.getStatus = function(code) {
      return statusService.getStatus(code);
    };

    projectDfd = projectsFactory.getProject($stateParams.projectId);
    projectDfd.success(function(project) {
      $scope.project = project;
    });

    filesDfd = filesFactory.getFiles($stateParams.projectId);
    filesDfd.success(function(files) {
      $scope.files = files;
    });

    templatesDfd = templatesFactory.getTemplates($stateParams.projectId);
    templatesDfd.success(function(templates) {
      $scope.templates = templates;
    });
  };

  ProjectCtrl.$inject = ['$scope', '$q', '$stateParams', 'projectsFactory', 'templatesFactory', 'filesFactory', 'statusService'];
  angular.module('panelModule').controller('ProjectCtrl', ProjectCtrl);

}());
