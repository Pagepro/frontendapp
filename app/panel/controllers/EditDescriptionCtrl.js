(function() {
  'use strict';
  var EditDescriptionCtrl = function($scope, $state, $stateParams, toaster, Upload, appSettings, $rootScope, spinnerService) {
    var updated = false;

    $scope.staticContent = {
      title: 'Edit Description',
      button: 'Save'
    };

    $scope.description = $scope.$parent.ticket.description;
    $scope.url = $scope.$parent.ticket.screenshot_url;
    $scope.ticketId = _.parseInt($scope.$parent.ticketId);
    $scope.filename = $scope.$parent.attachment;
    $scope.browsers = $scope.$parent.ticket.browsers;
    $scope.template = $scope.$parent.ticket.related_template || null;

    $scope.submitted = false;
    $scope.isUploading = false;
    $scope.file = null;


    $scope.updateNameValue = function(filename) {
      // fixme? Not sure, brute force value changing, since I can't access the element being created by nicefileinput
      angular.element('.NFI-filename').attr('value', filename);
    };
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
              browsers: $scope.browsers || '',
              description: $scope.description || '',
              screenshot_url: $scope.url || '',
              template: _.parseInt($scope.template.id)
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
      $rootScope.$broadcast('ticket:updated', {
        id: $scope.$parent.ticketId,
        updated: updated
      });
    };

    var init = function () {
      angular.element('.input--file').nicefileinput();
      $scope.updateNameValue($scope.$parent.ticket.attachment);
      $scope.templates = $scope.$parent.ticket.available_templates;
    };
    init();
  };

  EditDescriptionCtrl.$inject = ['$scope', '$state', '$stateParams', 'toaster', 'Upload', 'appSettings', '$rootScope', 'spinnerService'];
  angular.module('panelModule').controller('EditDescriptionCtrl', EditDescriptionCtrl);

}());
