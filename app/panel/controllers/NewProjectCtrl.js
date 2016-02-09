(function() {
  'use strict';
  var NewProjectCtrl = function($state, $scope, templateUploaderFactory) {
    if (!$state.params.projectId) {
      $state.go('myProjectsState');
    }
    $scope.$on('templateUploader:updated', function () {
      var api = templateUploaderFactory.getUploaderData();
      if (api.success) {
        $state.go('projectState', {
          projectId: api.id
        });
      }
    });
  };

  NewProjectCtrl.$inject = ['$state', '$scope', 'templateUploaderFactory'];
  angular.module('panelModule').controller('NewProjectCtrl', NewProjectCtrl);

}());
