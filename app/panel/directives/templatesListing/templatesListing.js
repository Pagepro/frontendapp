(function() {
  'use strict';
  var templatesListing = function(appSettings) {
    return {
      restrict: 'EA',
      scope: '=',
      templateUrl: 'app/panel/directives/templatesListing/templatesListing.html',
      link: function($scope) {
        $scope.screenshotRoot = appSettings.screenshotRoot(239, 242);
        $scope.activeInput = false;
        $scope.downloadAllLink = function(projectId) {
          return appSettings.templatesSrc + projectId;
        };
      }
    };
  };

  templatesListing.$inject = ['appSettings'];
  angular.module('panelModule').directive('templatesListing', templatesListing);
}());
