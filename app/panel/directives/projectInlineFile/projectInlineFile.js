(function() {
  'use strict';

  var projectInlineFile = function ($stateParams, appSettings, toaster, filesService) {
    return {
      restrict: 'A',
      templateUrl: 'app/panel/directives/projectInlineFile/projectInlineFile.html',
      link: function (scope) {
        scope.fileRoot = appSettings.fileRoot;
      }
    };
  };

  projectInlineFile.$inject = ['$stateParams', 'appSettings', 'toaster', 'filesService'];
  angular.module('panelModule').directive('projectInlineFile', projectInlineFile);

}());
