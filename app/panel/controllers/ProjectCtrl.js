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
      $scope.tickets = tickets.sort(function (item, nextItem) {
        return item.order > nextItem.order;
      });
    });


    $scope.sortableOptions = {
      // update: function() {
        // for (var index in $scope.tickets) {
        //   $scope.tickets[index].order = index;
        //   console.log([$scope.tickets[index].order]);
        // }
      // },
      update: function() {
        // set new order after update
        for (var index in $scope.tickets) {
          $scope.tickets[index].order = index;
        }
        // push all items to array with newly ordered ids
        ticketsService.updateOrder($scope.tickets.map(function (item) {
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
  };


  ProjectCtrl.$inject = ['$scope', '$stateParams', 'projectsService', 'templatesService', 'filesService', 'ticketsService', 'statusService'];
  angular.module('panelModule').controller('ProjectCtrl', ProjectCtrl);

}());
