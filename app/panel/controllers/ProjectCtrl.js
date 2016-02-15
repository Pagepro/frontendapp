(function() {
  'use strict';
  var ProjectCtrl = function($scope, $q, $stateParams, projectsService,
    ticketsService, statusService, spinnerService, toaster, $window, $rootScope) {
    var projectPromise;
    var ticketsPromise;
    var ticketsPage = 1;

    $scope.project = null;
    $scope.tickets = [];
    $scope.finishedFetching = false;
    $scope.projectId = $stateParams.projectId;

    $scope.getStatus = function(code) {
      return statusService.getStatus(code);
    };
    $scope.setDisplayType = function(type) {
      $window.localStorage.setItem('displayType', type);
      $scope.displayType = type;
    };

    $scope.init = function() {
      projectPromise = projectsService.getProject($stateParams.projectId);
      projectPromise.success(function(project) {
        $scope.project = project;
        $rootScope.pageName = project.name;
      });

      ticketsPromise = ticketsService.getTickets($stateParams.projectId);
      ticketsPromise.success(function(tickets) {
        $scope.tickets = tickets.results;
        $scope.ticketsLeft = tickets.count - $scope.tickets.length;
      });

      $q.all([projectPromise, ticketsPromise]).then(function() {
        $scope.finishedFetching = true;
        // spinnerService.hide('project-details');
      });
    };

    $scope.loadRemainingTickets = function() {
      ticketsPage++;
      ticketsService.getTickets($stateParams.projectId, ticketsPage)
        .success(function(tickets) {
          _.each(tickets.results, function (ticket) {
            $scope.tickets.push(ticket);
          });
          $scope.ticketsLeft = tickets.count - $scope.tickets.length;
        });
    };

    $scope.init();

    $scope.$on('ticket:submitted', function(params, data) {
      if (data.submitted) {
        ticketsPage = 1;
        ticketsService.getTickets($stateParams.projectId)
          .success(function(tickets) {
            $scope.tickets = tickets.results;
            $scope.ticketsLeft = tickets.count - $scope.tickets.length;
          })
          .error(function() {
            toaster.pop('error', 'Couldn\'t get the updated tickets list.', 'Please try refreshing the page, if the error occurs again, let us know!');
          });
      }
    });
  };

  ProjectCtrl.$inject = ['$scope', '$q', '$stateParams', 'projectsService',
    'ticketsService', 'statusService', 'spinnerService', 'toaster', '$window', '$rootScope'
  ];
  angular.module('panelModule').controller('ProjectCtrl', ProjectCtrl);

}());
