(function() {
  'use strict';
  var EditTemplateCtrl = function($scope, $state, $stateParams, templatesService, toaster, Upload) {

    $scope.title = null;
    $scope.image = null;
    $scope.comment = null;
    $scope.isUploading = false;
    $scope.file = null;

    var preLoadData = function () {
      templatesService.getTemplate($stateParams.projectId, $stateParams.templateId)
      .success(function (template) {
        $scope.title = template.name;
        $scope.image = template.filename;
        $scope.comment = template.comment;
      });
    };

    var init = function () {
      angular.element('.input--file').nicefileinput();
      preLoadData();
    };

    $scope.returnToProject = function () {
      $state.go('projectState', $state.projectId);
    };
    $scope.updateNameValue = function () {
      // fixme? Not sure, brute force value changing, since I can't access the element being created by nicefileinput
      angular.element('.NFI-filename').attr('value', $scope.file.name);
    };

    $scope.uploadFiles = function(file) {
      if(file) {
        $scope.isUploading = true;
        file.upload = Upload.upload({
          'url': 'http://localhost:1234/projects/4/templates',
          'data': {
            'file': file,
            'template': {
              'template_name': $scope.title
            },
            'comments': $scope.comment
          }
        }).success(function (data, status, headers, config) {
          console.log(config.data.file.name);
          console.log(config.data.template.template_name);
          toaster.pop('success', 'Success!', 'You have successfully updated the template.');
        })
        .error(function () {
          toaster.pop('error', 'Ooops!', 'Something went wrong. Please do not give up and try again! :)');
        })
        .finally(function () {
          // $scope.returnToProject();
        });
      }
    };


    init();
  };

  EditTemplateCtrl.$inject = ['$scope', '$state', '$stateParams', 'templatesService', 'toaster', 'Upload'];
  angular.module('panelModule').controller('EditTemplateCtrl', EditTemplateCtrl);

}());
