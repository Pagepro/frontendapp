(function() {
  'use strict';
  var ProjectCtrl = function($scope, $stateParams, statusService, $rootScope, project, $window) {

    var projectPromise;

    $rootScope.pageName = project.data.name;

    $scope.project = project.data;
    $scope.tickets = [];
    $scope.projectId = $stateParams.projectId;
    $scope.getStatus = function(code) {
      return statusService.getStatus(code);
    };
    $scope.setDisplayType = function(type) {
      $window.localStorage.setItem('displayType', type);
      $scope.displayType = type;
    };
    $scope.$on('ticket:submitted', function(params, data) {
      if (data.submitted) { $scope.ticketSubmitted(); }
    });
  };

  ProjectCtrl.$inject = ['$scope', '$stateParams', 'statusService', '$rootScope', 'project', '$window'];
  angular.module('panelModule').controller('ProjectCtrl', ProjectCtrl);

}());
