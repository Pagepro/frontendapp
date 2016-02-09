(function() {
  'use strict';
  var NewProjectCtrl = function($state, $scope, templateUploaderFactory) {
    if (!$state.params.projectId) {
      $state.go('myProjectsState');
    }
    $scope.$on('templateUploader:updated', function (data, id) {
      templateUploaderFactory.resetUploader();
      $state.go('projectState', {
        projectId: id
      });
    });
  };

  NewProjectCtrl.$inject = ['$state', '$scope', 'templateUploaderFactory'];
  angular.module('panelModule').controller('NewProjectCtrl', NewProjectCtrl);

}());
