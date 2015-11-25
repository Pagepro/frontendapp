(function() {
  'use strict';
  var ProjectCtrl = function($scope, $stateParams, projectsService, templatesService, filesService, ticketsService, statusService) {
    var projectPromise;
    var templatesPromise;
    var filesPromise;
    var ticketsPromise;

    $scope.project = null;
    $scope.files = null;
    $scope.templates = null;
    $scope.tickets = null;

    $scope.displayType = 'grid';

    $scope.getStatus = function(code) {
      return statusService.getStatus(code);
    };

    projectPromise = projectsService.getProject($stateParams.projectId);
    projectPromise.success(function(project) {
      $scope.project = project;
    });

    filesPromise = filesService.getFiles($stateParams.projectId);
    filesPromise.success(function(files) {
      $scope.files = files;
    });

    templatesPromise = templatesService.getTemplates($stateParams.projectId);
    templatesPromise.success(function(templates) {
      $scope.templates = templates;
      $scope.deleteTemplate = templatesService.deleteTemplate;
    });

    ticketsPromise = ticketsService.getTickets($stateParams.projectId);
    ticketsPromise.success(function(tickets) {
      $scope.tickets = tickets;
    });


    $scope.sortableOptions = {
      update: function(e, ui) {
        console.log(ui);
      },
      placeholder: 'drag-and-drop-placeholder',
      cancel: '.js-no-drop-item',
      handle: '.action-tool--drag-and-drop',
      cursor: 'move',
      opacity: 0.8,
      tolerance: 'pointer'
     };
  };


  ProjectCtrl.$inject = ['$scope', '$stateParams', 'projectsService', 'templatesService', 'filesService', 'ticketsService', 'statusService'];
  angular.module('panelModule').controller('ProjectCtrl', ProjectCtrl);

}());
