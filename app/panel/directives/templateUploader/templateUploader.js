(function () {
  'use strict';
  var templateUploader = function (Upload, toaster, appSettings, $stateParams, templateUploaderFactory) {
    return {
      templateUrl: 'app/panel/directives/templateUploader/templateUploader.html',
      scope: {
        id: '@?',
        filesUploadSuccess: '@?'
      },
      restrict: 'AE',
      link: function ($scope, element) {
        angular.element('.input--file').nicefileinput();

        $scope.filesProcessing = false;
        $scope.filesUploadSuccess = false;
        $scope.name = $stateParams.projectName;
        $scope.id = $stateParams.projectId;

        $scope.uploadFiles = function(files) {
          $scope.filesUploadSuccess = false;
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
                  $scope.filesProcessing = true;
                  $scope.filesUploadSuccess = true;
                  toaster.pop('success', 'Files added!', 'You have successfully added files to your project.');
                  templateUploaderFactory.setUploaderData({
                    id: $scope.id,
                    success: true
                  });
                })
                .error(function () {
                  templateUploaderFactory.setUploaderData({
                    id: $scope.id,
                    success: false
                  });
                });
            }
          }
        };
      }
    };
  };

  templateUploader.$inject = ['Upload', 'toaster', 'appSettings', '$stateParams', 'templateUploaderFactory'];
  angular.module('panelModule').directive('templateUploader', templateUploader);


}());
