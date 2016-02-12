(function() {
  'use strict';
  var EditDescriptionController = function($scope, $state, $stateParams, toaster, Upload, appSettings, $rootScope) {
    var userData;
    var updated = false;

    $scope.staticContent = {
      title: 'Edit Description',
      button: 'Save'
    };

    $scope.submitted = false;

    $scope.description = $scope.$parent.ticket.description;
    $scope.url = $scope.$parent.ticket.screenshot_url;
    $scope.filename = $scope.$parent.attachment;
    $scope.templates = $scope.$parent.templates;
    $scope.browsers = $scope.$parent.ticket.browsers;

    $scope.isUploading = false;
    $scope.file = null;

    angular.element('.input--file').nicefileinput();

    $scope.uploadFiles = function(file) {
      $scope.submitted = true;
      if (file) {
        $scope.isUploading = true;
        file.upload = Upload.upload({
            url: appSettings.apiRoot + 'projects/' + $stateParams.projectId + '/tickets/',
            data: {
              file: file,
              browsers: $scope.browsers,
              description: $scope.description,
              person: userData.id
            }
          }).success(function() {
            toaster.pop('success', 'Success!', 'Your ticket has been added.');
            updated = true;
            $scope.returnToParent();
          })
          .error(function() {
            toaster.pop('error', 'Ooops!', 'Something went wrong. Please do not give up and try again! :)');
          })
          .finally(function() {
            $scope.isUploading = false;
            $scope.returnToParent();
          });
      }
    };

    $scope.returnToParent = function() {
      $state.go('ticketState', {
        projectId: $stateParams.projectId,
        ticketId: $stateParams.ticketId
      });
      $rootScope.$broadcast('ticket:updated', {
        id: $stateParams.templateId,
        updated: updated
      });
    };
  };

  EditDescriptionController.$inject = ['$scope', '$state', '$stateParams', 'toaster', 'Upload', 'appSettings', '$rootScope'];
  angular.module('panelModule').controller('EditDescriptionController', EditDescriptionController);

}());
