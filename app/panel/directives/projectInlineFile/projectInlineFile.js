(function() {
  'use strict';

  var projectInlineFile = function (appSettings) {
    return {
      restrict: 'A',
      templateUrl: 'app/panel/directives/projectInlineFile/projectInlineFile.html',
      link: function (scope) {
        scope.fileRoot = appSettings.fileRoot;
      }
    };
  };

  projectInlineFile.$inject = ['appSettings'];
  angular.module('panelModule').directive('projectInlineFile', projectInlineFile);

}());
