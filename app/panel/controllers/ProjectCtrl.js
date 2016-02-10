(function() {
  'use strict';
  var ProjectCtrl = function($scope, $q, $stateParams, projectsService, templatesService, filesService,
    ticketsService, statusService, spinnerService, toaster, templateUploaderFactory) {
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
      stop: function() {
        // push all items to array with newly ordered ids
        templatesService.updateOrder($scope.templates.map(function(item) {
          return item.order;
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
    $scope.deleteTemplate = function(templateId) {
      if (confirm('Are you sure you want to remove the template?')) {
        templatesService.deleteTemplate($stateParams.projectId, templateId)
          .success(function() {
            $scope.templates = _.filter($scope.templates, function(item) {
              return item.id !== templateId;
            });
            toaster.pop('success', 'Template deleted.');
          })
          .error(function() {
            toaster.pop('error', 'Couldn\'t remove the template', 'If the error happens again, please contact us.');
          });
      }
    };
    $scope.loadRemainingTickets = function() {
      ticketsService.getTickets($stateParams.projectId, 'all')
        .success(function(tickets) {
          $scope.tickets = tickets.results;
          $scope.ticketsLeft = (tickets.count - $scope.tickets.length);
        });
    };

    $scope.$on('templateUploader:updated', function (params, id) {
      if ($stateParams.projectId === id) {
        spinnerService.show('project-details');
        templateUploaderFactory.resetUploader();
        templatesService.getTemplates($stateParams.projectId)
        .success(function(templates) {
          $scope.templates = templates;
        })
        .finally(function () {
          spinnerService.hide('project-details');
        });
      }
    });

    $scope.$on('template:updated', function (params, data) {
      if (data.changed) {
        templatesService.getTemplate($stateParams.projectId, data.id)
        .success(function (newTemplate) {
          _.each($scope.templates, function (template) {
            if (template.id === data.id) {
              template = newTemplate;
            }
          });
        });
      }
    });
  };

  ProjectCtrl.$inject = ['$scope', '$q', '$stateParams', 'projectsService', 'templatesService', 'filesService',
    'ticketsService', 'statusService', 'spinnerService', 'toaster', 'templateUploaderFactory'
  ];
  angular.module('panelModule').controller('ProjectCtrl', ProjectCtrl);

}());
