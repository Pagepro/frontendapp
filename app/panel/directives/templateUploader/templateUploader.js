(function() {
  'use strict';
  var templateUploader = function($q, Upload, toaster, appSettings, $stateParams, templateUploaderFactory) {
    return {
      templateUrl: 'app/panel/directives/templateUploader/templateUploader.html',
      scope: {
        sizeTotal: '&'
      },
      transclude: true,
      restrict: 'AE',
      link: function($scope) {
        $scope.filesProcessing = false;
        $scope.filesUploadSuccess = false;
        $scope.name = $stateParams.projectName;
        $scope.id = $stateParams.projectId;
        $scope.sizeTotal = 0;
        $scope.progress = 0;
        $scope.progressArr = [];

        angular.element('.input--file').nicefileinput();

        var uploadFiles = function uploadFiles(file, index) {
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
            .success(function() {
              dfd.resolve();
            });

          return dfd.promise;
        };

        templateUploaderFactory._register({
          progress: $scope.progress,
          size: $scope.sizeTotal,
          id: $scope.id,
          files: $scope.files
        });

        $scope.$watch('triggerChange', function() {
          var loaded = _.sum($scope.progressArr);
          if ($scope.progress < 100) {
            $scope.progress = _.round((loaded / $scope.sizeTotal) * 100);
          } else {
            $scope.progress = 100;
          }
        });

        $scope.uploadFiles = function(files) {
          $scope.filesUploadSuccess = false;
          $scope.files = files;
          if (files && files.length && !$scope.filesProcessing) {
            if (!files.$error) {
              $scope.filesProcessing = true;

              var filesDfd = _.map(files, function(file, index) {
                $scope.sizeTotal += file.size;
                return uploadFiles(file, index);
              });

              $q.all(filesDfd).then(function() {
                toaster.pop('success', 'Files added!', 'You have successfully added files to your project.');
                templateUploaderFactory.setSuccess($scope.id);
              });
            }
          }
        };
      }
    };
  };

  templateUploader.$inject = ['$q', 'Upload', 'toaster', 'appSettings', '$stateParams', 'templateUploaderFactory'];
  angular.module('panelModule').directive('templateUploader', templateUploader);


}());
