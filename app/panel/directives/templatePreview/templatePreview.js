(function() {
  'use strict';
  var templatePreview = function(statusService) {
    return {
      restrict: 'E',
      templateUrl: function (el, attr) {
        return 'app/panel/directives/templatePreview/' + attr.type + 'templatePreview.html';
      },
      link: function (scope) {
        scope.projectStatus = statusService.getStatus(scope.template.status);
      }
    };
  };

  templatePreview.$inject = ['statusService'];
  angular.module('frontendApp').directive('templatePreview', templatePreview);

}());

