(function() {
  'use strict';
  var NewProjectCtrl = function($scope, $state, $stateParams, Upload, appSettings, toaster, spinnerService) {
    if (!$stateParams.projectId) {
      $state.go('myProjectsState');
    } else {
      angular.element('.input--file').nicefileinput();

      $scope.filesProcessing = false;
      $scope.name = $stateParams.projectName;
      $scope.id = $stateParams.projectId;

      $scope.uploadFiles = function(files) {
        $scope.files = files;
        if (files && files.length && !$scope.filesProcessing) {
          if (!files.$error) {
            $scope.filesProcessing = true;
            Upload.upload({
                url: appSettings.apiRoot + 'projects/' + $stateParams.projectId + '/templates/',
                data: {
                  files: files,
                  projectId: $stateParams.projectId,
                  name: $scope.name
                }
              })
              .progress(function(event) {
                files.progress = _.round((event.loaded / event.total) * 100);
                files.sizeTotal = event.total;
              })
              .success(function () {
                spinnerService.show('new-project');
                $scope.filesProcessing = true;
                toaster.pop('success', 'Files added!', 'You have successfully added files to your project.');
                $state.go('projectState', {
                  projectId: $scope.id
                });
              });
          }
        }
      };
    }
  };

  NewProjectCtrl.$inject = ['$scope', '$state', '$stateParams', 'Upload', 'appSettings', 'toaster', 'spinnerService'];
  angular.module('panelModule').controller('NewProjectCtrl', NewProjectCtrl);

}());
