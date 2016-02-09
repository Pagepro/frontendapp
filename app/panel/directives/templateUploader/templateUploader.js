(function () {
  'use strict';
  var templateUploader = function ($q, Upload, toaster, appSettings, $stateParams, templateUploaderFactory) {
    return {
      templateUrl: 'app/panel/directives/templateUploader/templateUploader.html',
      scope: {
        name: '@',
        id: '@?',
        filesUploadSuccess: '@?'
      },
      restrict: 'AE',
      link: function ($scope) {
        var uploadFiles;

        $scope.filesProcessing = false;
        $scope.filesUploadSuccess = false;
        $scope.name = $stateParams.projectName;
        $scope.id = $stateParams.projectId;
        $scope.sizeTotal = 0;
        $scope.progressArr = [];

        angular.element('.input--file').nicefileinput();

        uploadFiles = function uploadFiles (file, index) {
          var dfd = $q.defer();
          Upload.upload({
              url: appSettings.apiRoot + 'projects/' + $stateParams.projectId + '/templates/',
              data: {
                files: file,
                name: file.name
              }
            })
            .progress(function(event) {
              $scope.progressArr[index] = event.loaded;
              // forcing change on a scope variable for $watch
              $scope.triggerChange = !$scope.triggerChange;
            })
            .success(function () {
              dfd.resolve();
            });

            return dfd.promise;
        };

        $scope.uploadFiles = function(files, index) {
          $scope.filesUploadSuccess = false;
          $scope.files = files;
          if (files && files.length && !$scope.filesProcessing) {
            if (!files.$error) {
              $scope.filesProcessing = true;

              var filesDfd = _.map(files, function (file, index) {
                $scope.sizeTotal += file.size;
                return uploadFiles(file, index);
              });

              $q.all(filesDfd).then(function (item) {
                toaster.pop('success', 'Files added!', 'You have successfully added files to your project.');
                templateUploaderFactory.setUploaderData({
                  id: $scope.id,
                  success: true
                });
              });
            }
          }
        };

        $scope.$watch('triggerChange', function (item) {
          var loaded = _.sum($scope.progressArr);
          $scope.progress = _.round((loaded / $scope.sizeTotal) * 100);
        });

      }
    };
  };

  templateUploader.$inject = ['$q', 'Upload', 'toaster', 'appSettings', '$stateParams', 'templateUploaderFactory'];
  angular.module('panelModule').directive('templateUploader', templateUploader);


}());
