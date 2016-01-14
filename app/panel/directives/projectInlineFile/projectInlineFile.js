(function() {
  'use strict';

  var projectInlineFile = function ($stateParams, appSettings, toaster, filesService) {
    return {
      restrict: 'A',
      templateUrl: 'app/panel/directives/projectInlineFile/projectInlineFile.html',
      link: function ($scope) {
        $scope.fileRoot = appSettings.fileRoot;
        $scope.removeFile = function () {
          filesService.removeFile($stateParams.projectId, $scope.file.id)
          .success(function () {
            toaster.pop('success', 'File removed!', 'You have successfully removed the file.');
          })
          .error(function () {
            toaster.pop('error', 'An error occured.', 'Unfortunately we couldn\'t remove the file. Please, try again');
          });
        };
      }
    };
  };

  projectInlineFile.$inject = ['$stateParams', 'appSettings', 'toaster', 'filesService'];
  angular.module('panelModule').directive('projectInlineFile', projectInlineFile);

}());
