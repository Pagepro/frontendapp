(function() {
  'use strict';
  var SubmitBugCtrl = function($scope, $state, $stateParams, toaster, Upload, templatesService, appSettings, accountService) {
    var userData;

    $scope.image = null;
    $scope.description = null;
    $scope.isUploading = false;
    $scope.file = null;

    accountService.getUserData().success(function(user) {
      userData = user;
    });

    var init = function() {
      angular.element('.input--file').nicefileinput();

      // this may be a number or null, depending on whether user enters
      // the view from url or from clicking a link with parameter
      // if it's clicked, it simply adds additional feature of selecting propper template for him
      $scope.currentTemplateId = $stateParams.templateId;

      templatesService.getTemplates($stateParams.projectId)
        .success(function(templates) {
          if (templates.length) {
            $scope.templates = _.map(templates, function(template) {
              var selected;
              if ($stateParams.templateId) {
                selected = (template.id === $stateParams.templateId);
              }
              return {
                id: template.id,
                name: template.name,
                selected: selected
              };
            });
          } else {
            toaster.pop('error', 'No templates yet.', 'There are no templates yet added to the project you\'re trying to add a ticket to. Please, first add a template, then add a ticket to it.');
            $scope.returnToProject();
          }
        });
    };

    init();

    $scope.uploadFiles = function(file) {
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
            $scope.returnToProject();
          })
          .error(function() {
            toaster.pop('error', 'Ooops!', 'Something went wrong. Please do not give up and try again! :)');
          })
          .finally(function() {
            $scope.isUploading = false;
            // $scope.returnToProject();
          });
      }
    };

    $scope.returnToProject = function() {
      $state.go('projectState', $stateParams.projectId);
    };

    $scope.updateNameValue = function(filename) {
      // fixme? Not sure, brute force value changing, since I can't access the element being created by nicefileinput
      angular.element('.NFI-filename').attr('value', filename);
    };
  };

  SubmitBugCtrl.$inject = ['$scope', '$state', '$stateParams', 'toaster', 'Upload', 'templatesService', 'appSettings', 'accountService'];
  angular.module('panelModule').controller('SubmitBugCtrl', SubmitBugCtrl);

}());
