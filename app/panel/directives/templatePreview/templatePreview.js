(function() {
  'use strict';
  var templatePreview = function(statusService) {
    return {
      restrict: 'E',
      templateUrl: 'app/panel/directives/templatePreview/templatePreview.html',
      link: function (scope) {
        scope.statusArr = statusService.getStatus(scope.template.statusCode);
      }
    };
  };

  templatePreview.$inject = ['statusService'];
  angular.module('frontendApp').directive('templatePreview', templatePreview);

}());

