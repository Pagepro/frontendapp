(function() {
  'use strict';
  var EditTemplateCtrl = function($scope, $state, $stateParams, templatesService, toaster, Upload, appSettings, $rootScope) {

    $scope.title = null;
    $scope.image = null;
    $scope.comment = null;
    $scope.isUploading = false;
    $scope.file = null;

    var changed = false;
    var fillFields = function() {
      templatesService.getTemplate($stateParams.projectId, $stateParams.templateId)
        .success(function(template) {
          $scope.title = template.name;
          $scope.image = template.filename;
          $scope.comment = template.work.comments;

          $scope.updateNameValue(template.filename);
        });
    };

    var init = function() {
      angular.element('.input--file').nicefileinput();
      fillFields();
    };

    init();

    $scope.uploadFiles = function(file) {
      $scope.isUploading = true;
      var tmpfile = file || {};

      // workaround for not submitting empty file
      var data = {
        name: $scope.title,
        comments: $scope.comment
      };
      if (file) {
        data.files = tmpfile;
      }
      // workaround for not submitting empty file

      tmpfile = Upload.upload({
          url: appSettings.apiRoot + 'projects/' + $stateParams.projectId + '/templates/' + $stateParams.templateId + '/',
          method: 'PUT',
          data: data
        }).success(function() {
          toaster.pop('success', 'Success!', 'You have successfully updated the template.');
          changed = true;
          $scope.returnToProject();
        })
        .error(function() {
          toaster.pop('error', 'Ooops!', 'Something went wrong. Please do not give up and try again! :)');
        })
        .finally(function() {
          $scope.isUploading = false;
        });
    };

    $scope.returnToProject = function() {
      $state.go('projectState');
      $rootScope.$broadcast('template:updated', {
        id: $stateParams.templateId,
        changed: changed
      });
    };

    $scope.updateNameValue = function(filename) {
      // fixme? Not sure, brute force value changing, since I can't access the element being created by nicefileinput
      angular.element('.NFI-filename').attr('value', filename);
    };
  };

  EditTemplateCtrl.$inject = ['$scope', '$state', '$stateParams', 'templatesService', 'toaster', 'Upload', 'appSettings', '$rootScope'];
  angular.module('panelModule').controller('EditTemplateCtrl', EditTemplateCtrl);

}());
