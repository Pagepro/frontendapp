(function() {
  'use strict';

  var projectTickets = function($window, $filter, $stateParams, ticketsService, toaster, spinnerService) {
    return {
      isolate: false,
      restrict: 'EA',
      templateUrl: 'app/panel/directives/projectTickets/projectTickets.html',
      controller: ['$scope', function($scope) {
        var ticketsPromise;
        var ticketsPage = 1;

        $scope.ticketsOrderBy = '';
        $scope.reverse = false;
        $scope.ticketsFetched = false;

        spinnerService.show('tickets-spinner');

        ticketsPromise = ticketsService.getTickets($stateParams.projectId);

        ticketsPromise.success(function(tickets) {
            $scope.tickets = tickets.results;
            $scope.ticketsLeft = tickets.count - $scope.tickets.length;
          })
          .finally(function() {
            spinnerService.hide('tickets-spinner');
            $scope.ticketsFetched = true;
          });

        $scope.ticketSubmitted = function() {
          ticketsPage = 1;
          spinnerService.show('tickets-spinner');
          ticketsService.getTickets($stateParams.projectId)
            .success(function(tickets) {
              $scope.tickets = tickets.results;
              $scope.ticketsLeft = tickets.count - $scope.tickets.length;
            })
            .error(function() {
              toaster.pop('error', 'Couldn\'t get the updated tickets list.', 'Please try refreshing the page, if the error occurs again, let us know!');
            })
            .finally(function() {
              spinnerService.hide('tickets-spinner');
            });
        };

        $scope.loadRemainingTickets = function() {
          spinnerService.show('tickets-spinner');
          console.log(ticketsPage);
          ticketsPage++;
          ticketsService.getTickets($stateParams.projectId, ticketsPage)
            .success(function(tickets) {
              $scope.tickets = _.concat($scope.tickets, tickets.results);
              $scope.ticketsLeft = tickets.count - $scope.tickets.length;
            })
            .finally(function() {
              spinnerService.hide('tickets-spinner');
            });
        };

        // $scope.filteredBy = '$window.localStorage.ticketsFilter ? $window.localStorage.ticketsFilter : 'active';
        $scope.filteredBy = 'active';

        $scope.filterStatus = function(status, $event) {
          $event.preventDefault();
          if ($scope.filteredBy !== status) {
            // $window.localStorage.ticketsFilter = status;
            $scope.filteredBy = status;
          } else {
            // $window.localStorage.ticketsFilter = 'none';
            $scope.filteredBy = '';
          }
        };

        $scope.order = function(ticketsOrderBy) {
          // starting from reverse = false, so the 2nd click will toggle it to true
          // 3rd click will turn off the orderBy filter
          if (ticketsOrderBy !== $scope.ticketsOrderBy) {
            $scope.ticketsOrderBy = ticketsOrderBy;
            // here's a reset on changing filter name
            $scope.reverse = false;
          } else {
            if (!$scope.reverse) {
              $scope.reverse = true;
            } else {
              $scope.ticketsOrderBy = '';
            }
          }
        };
      }]
    };
  };

  projectTickets.$inject = ['$window', '$filter', '$stateParams', 'ticketsService', 'toaster', 'spinnerService'];
  angular.module('panelModule').directive('projectTickets', projectTickets);

}());
