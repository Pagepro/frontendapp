(function() {
  'use strict';
  var templateUploader = function($q, Upload, toaster, appSettings, $stateParams, $rootScope, spinnerService) {
    return {
      templateUrl: 'app/panel/directives/templateUploader/templateUploader.html',
      scope: {},
      transclude: true,
      restrict: 'AE',
      link: function($scope) {

        angular.element('.input--file').nicefileinput();

        var progressArr = [];
        var uploadFiles;
        var clearScopeData;
        var filesDfd;

        $scope.uploadFiles = function(files) {
          $scope.progress = 0;
          $scope.sizeTotal = 0;

          $scope.filesUploadSuccess = false;
          $scope.files = files;

          if (files && files.length && !$scope.filesProcessing) {
            if (!files.$error) {
              $scope.filesProcessing = true;

              filesDfd = _.map(files, function(file, index) {
                $scope.sizeTotal += file.size;
                return uploadFiles(file, index);
              });

              $q.all(filesDfd).then(function() {
                toaster.pop('success', 'Files added!', 'You have successfully added files to your project.');
                $rootScope.$broadcast('templateUploader:updated', $stateParams.projectId);

                clearScopeData();
              });
            }
          }
        };

        uploadFiles = function uploadFiles(file, index) {
          var dfd = $q.defer();
          Upload.upload({
              url: appSettings.apiRoot + 'projects/' + $stateParams.projectId + '/templates/',
              data: {
                files: file,
                name: file.name
              }
            })
            .progress(function(event) {
              progressArr[index] = event.loaded;
              $scope.$broadcast('progress:updated');
            })
            .success(function() {
              dfd.resolve();
            });

          return dfd.promise;
        };

        clearScopeData = function clearScopeData() {
          $scope.progress = 0;
          $scope.sizeTotal = 0;
          $scope.files = null;
          $scope.filesUploadSuccess = false;
          $scope.filesProcessing = false;
          filesDfd = [];
          progressArr = [];
        };

        $scope.$on('progress:updated', function() {
          var loaded = _.sum(progressArr);
          if ($scope.progress < 100) {
            $scope.progress = _.round((loaded / $scope.sizeTotal) * 100);
          } else {
            spinnerService.showGroup('full-page');
            $scope.progress = 100;
          }
        });
      }
    };
  };

  templateUploader.$inject = ['$q', 'Upload', 'toaster', 'appSettings', '$stateParams', '$rootScope', 'spinnerService'];
  angular.module('panelModule').directive('templateUploader', templateUploader);


}());
