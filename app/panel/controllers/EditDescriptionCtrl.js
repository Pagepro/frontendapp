(function() {
  'use strict';
  var EditDescriptionController = function($scope, $state, $stateParams, toaster, Upload, appSettings, $rootScope, spinnerService) {
    var updated = false;

    $scope.staticContent = {
      title: 'Edit Description',
      button: 'Save'
    };

    $scope.description = $scope.$parent.ticket.description;
    $scope.url = $scope.$parent.ticket.screenshot_url;
    $scope.templates = $scope.$parent.ticket.templates;
    $scope.filename = $scope.$parent.attachment;
    $scope.templates = $scope.$parent.templates;
    $scope.browsers = $scope.$parent.ticket.browsers;

    $scope.submitted = false;
    $scope.isUploading = false;
    $scope.file = null;

    angular.element('.input--file').nicefileinput();

    $scope.uploadFiles = function(file) {
      if ($scope.description.length) {
        spinnerService.show('ticket-spinner');
        $scope.submitted = true;
        $scope.isUploading = true;
        Upload.upload({
            url: appSettings.apiRoot + 'projects/' + $stateParams.projectId + '/tickets/' + $scope.$parent.ticketId + '/',
            method: 'PUT',
            data: {
              file: file,
              browsers: $scope.browsers,
              description: $scope.description
            }
          }).success(function() {
            toaster.pop('success', 'Success!', 'Your ticket has been added.');
            updated = true;
            $scope.returnToParent();
          })
          .error(function(response) {
            toaster.pop('error', 'Ooops!', 'Something went wrong. We could\'t update the ticket. \n' + response.detail);
          })
          .finally(function() {
            spinnerService.hide('ticket-spinner');
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

  EditDescriptionController.$inject = ['$scope', '$state', '$stateParams', 'toaster', 'Upload', 'appSettings', '$rootScope', 'spinnerService'];
  angular.module('panelModule').controller('EditDescriptionController', EditDescriptionController);

}());
