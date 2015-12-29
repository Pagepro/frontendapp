(function() {
  'use strict';
  var EditTemplateCtrl = function($scope, $state, $stateParams, templatesService, toaster, Upload, appSettings) {
    $scope.title = null;
    $scope.image = null;
    $scope.comment = null;
    $scope.isUploading = false;
    $scope.file = null;

    var fillFields = function () {
      templatesService.getTemplate($stateParams.projectId, $stateParams.templateId)
      .success(function (template) {
        $scope.title = template.name;
        $scope.image = template.filename;
        $scope.comment = template.comment;

        $scope.updateNameValue(template.filename);
      });
    };

    var init = function () {
      angular.element('.input--file').nicefileinput();
      fillFields();
    };

    init();

    $scope.uploadFiles = function(file) {
      if(file) {
        $scope.isUploading = true;
        file.upload = Upload.upload({
          'url': appSettings.apiRoot + 'uploads/',
          'data': {
            'file': file,
            'template': {
              'template_name': $scope.title
            },
            'comments': $scope.comment
          }
        }).success(function () {
          toaster.pop('success', 'Success!', 'You have successfully updated the template.');
        })
        .error(function () {
          toaster.pop('error', 'Ooops!', 'Something went wrong. Please do not give up and try again! :)');
        })
        .finally(function () {
          $scope.isUploading = false;
          // $scope.returnToProject();
        });
      }
    };

    $scope.returnToProject = function () {
      $state.go('projectState', $state.projectId);
    };

    $scope.updateNameValue = function (filename) {
      // fixme? Not sure, brute force value changing, since I can't access the element being created by nicefileinput
      angular.element('.NFI-filename').attr('value', filename);
    };
  };

  EditTemplateCtrl.$inject = ['$scope', '$state', '$stateParams', 'templatesService', 'toaster', 'Upload', 'appSettings'];
  angular.module('panelModule').controller('EditTemplateCtrl', EditTemplateCtrl);

}());
