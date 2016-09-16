(function() {
  'use strict';
  var EditTemplateCtrl = function($scope, $state, $stateParams, toaster, Upload, appSettings, $rootScope, template, templatesService) {
    $scope.isUploading = false;
    $scope.file = null;

    angular.element('.input--file').nicefileinput();

    var changed = false;

    $scope.title = template.data.name;
    $scope.image = template.data.filename;
    $scope.comment = template.data.work.comments;

    $scope.updateNameValue = function(filename) {
      angular.element('.NFI-filename').attr('value', filename);
    };

    $scope.updateNameValue(template.data.filename);

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
      // workaround to avoid empty file submission

      tmpfile = Upload.upload({
          url: appSettings.apiRoot + 'projects/' + $stateParams.projectId + '/templates/' + $stateParams.templateId + '/',
          method: 'PUT',
          data: data
        }).success(function() {
          toaster.pop('success', 'Success!', 'You have successfully updated the template.');
          changed = true;
          templatesService.removeCache(1);
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
      $rootScope.preventAutoScroll = true;
      $state.go('projectState');
      $rootScope.$broadcast('template:updated', {
        id: $stateParams.templateId,
        changed: changed
      });
    };

  };

  EditTemplateCtrl.$inject = ['$scope', '$state', '$stateParams', 'toaster', 'Upload', 'appSettings', '$rootScope', 'template', 'templatesService'];
  angular.module('panelModule').controller('EditTemplateCtrl', EditTemplateCtrl);

}());
