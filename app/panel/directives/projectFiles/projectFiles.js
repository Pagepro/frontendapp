(function () {
  'use strict';

  var projectFiles = function (appSettings, $stateParams, filesService, spinnerService, toaster) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/panel/directives/projectFiles/projectFiles.html',
      link: function (scope) {
        scope.files = null;
        scope.filesSrc = function (projectId) {
          return appSettings.filesSrc + projectId;
        };

        filesService.getFiles($stateParams.projectId).success(function(files) {
          scope.files = files;
        });

        scope.$on('files:added', function (params, id) {
          if ($stateParams.projectId === id) {
            spinnerService.show('files-spinner');
            filesService.getFiles($stateParams.projectId)
              .success(function(files) {
                scope.files = files;
              })
              .finally(function() {
                spinnerService.hideAll();
              });
          }
        });

        scope.removeFile = function(fileId) {
          console.log(fileId);
          if (confirm('Are you sure you want to remove this file?')) {
            filesService.removeFile($stateParams.projectId, fileId)
              .success(function() {
                scope.files = _.filter(scope.files, function(item) {
                  return item.id !== fileId;
                });
                toaster.pop('success', 'File deleted.');
              })
              .error(function() {
                toaster.pop('error', 'Couldn\'t remove the file', 'If the error happens again, please contact us.');
              });
          }
        };

      }
    };
  };

  projectFiles.$inject = ['appSettings', '$stateParams', 'filesService', 'spinnerService', 'toaster'];
  angular.module('panelModule').directive('projectFiles', projectFiles);

}());
