(function() {
  'use strict';
  var ProjectCtrl = function($q, $scope, $stateParams, projectsService,
    ticketsService, statusService, toaster, $window, $rootScope,
    project) {

    var projectPromise;

    $scope.project = null;
    $scope.tickets = [];
    $scope.finishedFetching = true;
    $scope.projectId = $stateParams.projectId;

    $scope.getStatus = function(code) {
      return statusService.getStatus(code);
    };

    $scope.setDisplayType = function(type) {
      $window.localStorage.setItem('displayType', type);
      $scope.displayType = type;
    };

      $scope.project = project.data;
      $rootScope.pageName = project.data.name;

    $scope.$on('ticket:submitted', function(params, data) {
      if (data.submitted) { $scope.ticketSubmitted(); }
    });

  };

  ProjectCtrl.$inject = ['$q', '$scope', '$stateParams', 'projectsService',
    'ticketsService', 'statusService', 'toaster', '$window', '$rootScope',
    'project'
  ];
  angular.module('panelModule').controller('ProjectCtrl', ProjectCtrl);

}());
