(function() {
  'use strict';
  var NewProjectCtrl = function($state, $scope) {
    if (!$state.params.projectId) {
      $state.go('myProjectsState');
    }
    $scope.$on('templateUploader:updated', function(data, id) {
      $state.go('projectState', {
        projectId: id
      });
    });
  };

  NewProjectCtrl.$inject = ['$state', '$scope'];
  angular.module('panelModule').controller('NewProjectCtrl', NewProjectCtrl);

}());
