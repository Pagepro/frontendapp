(function() {
  'use strict';

  var inlineProject = function(statusService) {
    return {
      restrict: 'EA',
      templateUrl: 'app/panel/directives/inlineProject/inlineProject.html',
      link: function(scope) {
        // scope.projectStatus.labelContent = "finished";
        scope.projectStatus = statusService.getStatus(scope.project.status);
      }
    };
  };

  angular.$inject = ['statusService'];
  angular.module('panelModule').directive('inlineProject', inlineProject);

}());
