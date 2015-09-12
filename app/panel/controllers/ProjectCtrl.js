(function() {
  'use strict';
  var ProjectCtrl = function($scope, $stateParams, projectsFactory, statusService) {
    $scope.project = null;
    $scope.getStatus = function (code) {
      return statusService.getStatus(code);
    };

    projectsFactory.getProject($stateParams.projectId)
    .success(function (resp) {
      $scope.project = resp;
    })
    .error(function () {
      // console.log('nope');
    });
  };

  ProjectCtrl.$inject = ['$scope', '$stateParams', 'projectsFactory', 'statusService'];
  angular.module('frontendApp').controller('ProjectCtrl', ProjectCtrl);

}());
