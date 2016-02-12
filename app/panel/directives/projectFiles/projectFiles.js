(function () {
  'use strict';

  var projectFiles = function (appSettings) {
    return {
      restrict: 'EA',
      templateUrl: 'app/panel/directives/projectFiles/projectFiles.html',
      link: function ($scope) {
        $scope.filesSrc = function (projectId) {
          return appSettings.filesSrc + projectId;
        };
      }
    };
  };

  projectFiles.$inject = ['appSettings'];
  angular.module('panelModule').directive('projectFiles', projectFiles);

}());
