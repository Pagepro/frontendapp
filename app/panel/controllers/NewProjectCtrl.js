(function() {
  'use strict';
  var NewProjectCtrl = function($scope, $state, $stateParams, Upload, appSettings) {
    // if (!$stateParams.projectId) {
    //   $state.go('myProjectsState');
    // } else {
      angular.element('.input--file').nicefileinput();

      $scope.filesInProgress = [];
      $scope.name = $stateParams.projectName;
      $scope.id = $stateParams.projectName;

      $scope.$watch('files', function () {
          $scope.upload($scope.files);
      });
      $scope.$watch('file', function () {
          if ($scope.file != null) {
              $scope.files = [$scope.file];
          }
      });

      $scope.upload = function (files) {
        if (files && files.length) {
          _.each(files, function (file) {
            if(!file.$error) {
              $scope.filesInProgress.push(file);
              Upload.upload({
                url: appSettings.apiRoot + 'projects/' + 4 + '/',
                data: {
                  file: file,
                  projectId: $stateParams.projectId
                }
              })
              .progress(function (event) {
              file.progress = _.parseInt(event.loaded / event.total);

              if (event.total > 1024 * 1024) {
                file.sizeTotal = _.round((event.total / 1024 / 1024), 2);
                file.unit = 'MB';
              } else {
                file.sizeTotal = _.round((event.total / 1024), 2);
                file.unit = 'KB';
              }

              $scope.$apply();

              });
            }
          });
        }
      };
    // }
  };

  NewProjectCtrl.$inject = ['$scope', '$state', '$stateParams', 'Upload', 'appSettings'];
  angular.module('panelModule').controller('NewProjectCtrl', NewProjectCtrl);

}());
