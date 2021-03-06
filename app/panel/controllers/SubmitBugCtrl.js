(function() {
  'use strict';
  var SubmitBugCtrl = function($scope, $rootScope, $state, $stateParams, toaster, Upload, appSettings, spinnerService, templates, template) {
    $scope.staticContent = {
      title: 'Submit Ticket',
      button: 'Create Ticket'
    };
    var submitted = false;

    $scope.submitted = false;
    $scope.image = null;
    $scope.description = '';
    $scope.isUploading = false;
    $scope.file = null;

    $scope.templates = templates;
    $scope.template = template;

    angular.element('.input--file').nicefileinput();


    $scope.uploadFiles = function(file) {
      if (file && !$scope.template) {
        toaster.pop('error', 'Cannot do that', 'You need to specify a template if you want to create a ticket with a screenshow.');
        return false;;
      }
      if ($scope.description.length) {
        spinnerService.show('ticket-spinner');
        var data = {
          browsers: $scope.browsers,
          description: $scope.description,
          screenshot_url: $scope.url,
          template: $scope.template ? $scope.template.id : null
        };
        if (file) {
          data.file = file;
        }

        $scope.isUploading = true;

        Upload.upload({
            url: appSettings.apiRoot + 'projects/' + $stateParams.projectId + '/tickets/',
            data: data
          }).success(function() {
            toaster.pop('success', 'Success!', 'Your ticket has been added.');
            submitted = true;
          })
          .error(function() {
            toaster.pop('error', 'Ooops!', 'Something went wrong. Please do not give up and try again! :)');
          })
          .finally(function() {
            $scope.isUploading = false;
            $scope.returnToParent();
          });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.returnToParent = function() {
      $rootScope.preventAutoScroll = true;
      $state.go('projectState', $stateParams.projectId);
      $rootScope.$broadcast('ticket:submitted', {
        id: $stateParams.templateId,
        submitted: submitted
      });
    };

    $scope.updateNameValue = function(filename) {
      angular.element('.NFI-filename').attr('value', filename);
    };
  };

  SubmitBugCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'toaster', 'Upload', 'appSettings', 'spinnerService', 'templates', 'template'];
  angular.module('panelModule').controller('SubmitBugCtrl', SubmitBugCtrl);

}());
