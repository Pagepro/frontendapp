(function() {
  'use strict';
  var templatePreview = function(statusService, appSettings) {
    return {
      restrict: 'E',
      templateUrl: function (el, attr) {
        return 'app/panel/directives/templatePreview/' + attr.type + 'TemplatePreview.html';
      },
      link: function (scope) {
        scope.projectStatus = statusService.getStatus(scope.template.status);
        scope.baseUrl = appSettings.screenshotRoot(239, 242);
      }
    };
  };

  templatePreview.$inject = ['statusService', 'appSettings'];
  angular.module('frontendApp').directive('templatePreview', templatePreview);

}());

