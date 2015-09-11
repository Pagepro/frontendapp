(function() {
  'use strict';
  var ProjectCtrl = function($scope, $stateParams, projectsFactory) {
    $scope.project = null;
    projectsFactory.getProject($stateParams.projectId)
    .success(function (resp) {
      $scope.project = resp;
    })
    .error(function () {
      console.log('nope');
    });
  };

  ProjectCtrl.$inject = ['$scope', '$stateParams', 'projectsFactory'];
  angular.module('frontendApp').controller('ProjectCtrl', ProjectCtrl);

}());
