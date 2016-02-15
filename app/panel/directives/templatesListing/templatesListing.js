(function() {
  'use strict';
  var templatesListing = function(appSettings, $stateParams, templatesService, $window, toaster, spinnerService) {
    return {
      restrict: 'EA',
      templateUrl: 'app/panel/directives/templatesListing/templatesListing.html',
      link: function(scope) {
        var order;
        var templatesPromise;
        var order = [];

        scope.templates = null;
        scope.screenshotRoot = appSettings.screenshotRoot(239, 242);
        scope.activeInput = false;

        scope.displayType = $window.localStorage.getItem('displayType') || 'grid';

        spinnerService.show('templates-listing');

        scope.downloadAllLink = function(projectId) {
          return appSettings.templatesSrc + projectId;
        };

        templatesService.getTemplates($stateParams.projectId).success(function(templates) {
          scope.templates = templates;
          order = _.map(scope.templates, function(template) {
            template.order = template.id;
            return template.id;
          });
        }).finally(function() {
          spinnerService.hide('templates-listing');
        });

        scope.dragControlListeners = {
          additionalPlaceholderClass: 'js-item-disabled',
          dragEnd: function(event) {
            var newOrder = _.map(event.dest.sortableScope.modelValue, function(value) {
              return value.order;
            });
            if (order !== newOrder) {
              templatesService.updateOrder(newOrder);
            }
          }
        };

        scope.$on('template:updated', function(params, data) {
          if (data.changed) {
            templatesService.getTemplate($stateParams.projectId, data.id)
              .success(function(newTemplate) {
                var newList = _.map(scope.templates, function(template) {
                  if (template.id === _.parseInt(data.id)) {
                    template = newTemplate;
                  }
                  return template;
                });
                scope.templates = newList;
              });
          }
        });

        scope.$on('images:added', function(params, id) {
          if ($stateParams.projectId === id) {
            spinnerService.show('templates-listing');
            templatesService.getTemplates($stateParams.projectId)
              .success(function(templates) {
                scope.templates = templates;
                order = _.map(scope.templates, function(template) {
                  template.order = template.id;
                  return template.id;
                });
              })
              .finally(function() {
                spinnerService.hideAll();
              });
          }
        });

        scope.deleteTemplate = function(templateId) {
          if (confirm('Are you sure you want to remove the template?')) {
            templatesService.deleteTemplate($stateParams.projectId, templateId)
              .success(function() {
                scope.templates = _.filter(scope.templates, function(item) {
                  return item.id !== templateId;
                });
                order = _.filter(order, function(item) {
                  return item !== templateId;
                });
                toaster.pop('success', 'Template deleted.');
              })
              .error(function() {
                toaster.pop('error', 'Couldn\'t remove the template', 'If the error happens again, please contact us.');
              });
          }
        };
      }
    };
  };

  templatesListing.$inject = ['appSettings', '$stateParams', 'templatesService', '$window', 'toaster', 'spinnerService'];
  angular.module('panelModule').directive('templatesListing', templatesListing);
}());
