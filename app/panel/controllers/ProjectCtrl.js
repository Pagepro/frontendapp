(function() {
  'use strict';
  var ProjectCtrl = function($scope, $q, $stateParams, projectsService, templatesService, filesService,
    ticketsService, statusService, spinnerService, toaster, $window) {
    var projectPromise;
    var templatesPromise;
    var filesPromise;
    var ticketsPromise;
    var order = [];

    $scope.project = null;
    $scope.files = null;
    $scope.templates = null;
    $scope.tickets = null;
    $scope.finishedFetching = false;
    $scope.projectId = $stateParams.projectId;

    $scope.displayType = $window.localStorage.getItem('displayType') || 'grid';

    $scope.getStatus = function(code) {
      return statusService.getStatus(code);
    };
    $scope.setDisplayType = function(type) {
      $window.localStorage.setItem('displayType', type);
      $scope.displayType = type;
    };
    $scope.dragControlListeners = {
      accept: function(sourceItemHandleScope, destSortableScope) {
        return true;
      },
      itemMoved: function(event) {
        console.log(event);
      },
      additionalPlaceholderClass: 'js-item-disabled',
      orderChanged: function(event) {
        var newOrder = _.map(event.dest.sortableScope.modelValue, function(value) {
          return value.order;
        });
        if (order !== newOrder) {
          templatesService.updateOrder(newOrder);
        }
      }
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
        order = _.map(templates, function(template) {
          return template.order;
        });
      });

      ticketsPromise = ticketsService.getTickets($stateParams.projectId);
      ticketsPromise.success(function(tickets) {
        $scope.tickets = tickets.results;
        $scope.ticketsLeft = (tickets.count - $scope.tickets.length);
      });

      $q.all([projectPromise, filesPromise, templatesPromise, ticketsPromise]).then(function() {
        $scope.finishedFetching = true;
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

    $scope.$on('templateUploader:updated', function(params, id) {
      if ($stateParams.projectId === id) {
        spinnerService.show('project-details');
        templatesService.getTemplates($stateParams.projectId)
          .success(function(templates) {
            $scope.templates = templates;
          })
          .finally(function() {
            spinnerService.hide('project-details');
          });
      }
    });

    $scope.$on('template:updated', function(params, data) {
      if (data.changed) {
        templatesService.getTemplate($stateParams.projectId, data.id)
          .success(function(newTemplate) {
            var newList = _.map($scope.templates, function(template) {
              if (template.id == data.id) {
                template = newTemplate;
              }
              return template;
            });
            $scope.templates = newList;
          });
      }
    });
    $scope.$on('ticket:submitted', function(params, data) {
      if (data.submitted) {
        ticketsService.getTickets($stateParams.projectId)
          .success(function(tickets) {
            $scope.tickets = tickets.results;
          })
          .error(function() {
            toaster.pop('error', 'Couldn\'t get the updated tickets list.', 'Please try refreshing the page, if the error occurs again, let us know!');
          });
      }
    });
  };

  ProjectCtrl.$inject = ['$scope', '$q', '$stateParams', 'projectsService', 'templatesService', 'filesService',
    'ticketsService', 'statusService', 'spinnerService', 'toaster', '$window'
  ];
  angular.module('panelModule').controller('ProjectCtrl', ProjectCtrl);

}());
