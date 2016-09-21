(function() {
  'use strict';
  var templatePreview = function($state, $rootScope, statusService, appSettings) {
    return {
      restrict: 'E',
      templateUrl: function (el, attr) {
        return 'app/panel/directives/templatePreview/' + attr.type + 'TemplatePreview.html';
      },
      link: function (scope) {
        scope.projectStatus = statusService.getStatus(scope.template.status);
        scope.baseUrl = appSettings.screenshotRoot(239, 242);
        scope.submitBug = function (templateId) {
          $rootScope.preventAutoScroll = true;
          $state.go('projectState.submitBug', {templateId: templateId});
        };
        scope.editTemplate = function (templateId) {
          $rootScope.preventAutoScroll = true;
          $state.go('projectState.editTemplate', {templateId: templateId});
        };
      }
    };
  };

  templatePreview.$inject = ['$state', '$rootScope', 'statusService', 'appSettings'];
  angular.module('frontendApp').directive('templatePreview', templatePreview);

}());

