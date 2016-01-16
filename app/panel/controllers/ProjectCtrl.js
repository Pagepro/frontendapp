(function() {
  'use strict';
  var ProjectCtrl = function($scope, $q, $stateParams, projectsService, templatesService, filesService,
    ticketsService, statusService, spinnerService) {
    var projectPromise;
    var templatesPromise;
    var filesPromise;
    var ticketsPromise;

    $scope.project = null;
    $scope.files = null;
    $scope.templates = null;
    $scope.tickets = null;
    $scope.projectId = $stateParams.projectId;

    $scope.displayType = 'grid';

    $scope.getStatus = function(code) {
      return statusService.getStatus(code);
    };

    $scope.sortableOptions = {
      update: function() {
        // set new order after update
        for (var index in $scope.templates) {
          $scope.templates[index].order = index;
        }
        // push all items to array with newly ordered ids
        templatesService.updateOrder($scope.templates.map(function(item) {
          return item.id;
        }));
      },
      placeholder: 'drag-and-drop-placeholder',
      cancel: '.js-no-drop-item',
      handle: '.action-tool--drag-and-drop',
      cursor: 'move',
      opacity: 0.8,
      tolerance: 'pointer'
    };
    $scope.init = function() {
      spinnerService.show('project-details');
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
        $scope.templates = templates.sort(function(item, nextItem) {
          return item.order > nextItem.order;
        });
      });

      ticketsPromise = ticketsService.getTickets($stateParams.projectId);
      ticketsPromise.success(function(tickets) {
        $scope.tickets = tickets.results;
        $scope.ticketsLeft = (tickets.count - $scope.tickets.length);
      });

      $q.all([projectPromise, filesPromise, templatesPromise, ticketsPromise]).then(function() {
        spinnerService.hide('project-details');
      });
    };
    $scope.loadRemainingTickets = function () {
      ticketsService.getTickets($stateParams.projectId, 'all')
      .success(function (tickets) {
        $scope.tickets = tickets.results;
        $scope.ticketsLeft = (tickets.count - $scope.tickets.length);
      });
    };
  };


  ProjectCtrl.$inject = ['$scope', '$q', '$stateParams', 'projectsService', 'templatesService', 'filesService',
  'ticketsService', 'statusService', 'spinnerService'];
  angular.module('panelModule').controller('ProjectCtrl', ProjectCtrl);

}());
