(function() {
  'use strict';

  var statusToggler = function(ticketsService, ticketStatusService, toaster) {
    return {
      restrict: 'E',
      replace: true,
      scope: false,
      templateUrl: 'app/panel/directives/statusToggler/statusToggler.html',
      link: function(scope) {
        scope.currentStatus = scope.ticket.status || 1;
        /*

        On the order of the status codes here,
        depends the order in which they are displayed
        in the component!

        *  1 - NEW
        *  2 - Q&A
        *  3 - REJECTED
        *  4 - FINISHED
        *  5 - IN PROGRESS
        *  6 - RESOLVED

        */
        scope.availableStatuses = [1, 5, 2, 4, 3, 6];

        scope.getStatus = ticketStatusService.getStatus;
        scope.statusListVisible = false;
        scope.setTicketStatus = function(newStatus) {
          var statusHolder = scope.currentStatus;
          if (statusHolder !== newStatus) {
            ticketsService.setTicketStatus(scope.projectId, scope.ticketId, newStatus)
              .success(function() {
                toaster.pop('success', 'Successfully updated the status.');
                statusHolder = newStatus;
              })
              .error(function() {
                toaster.pop('error', 'Couldn\'t update status.');
              })
              .finally(function () {
                scope.currentStatus = statusHolder;
              });
          }
        };
        scope.toggleStatusList = function() {
          scope.statusListVisible = !scope.statusListVisible;
        };
        scope.hideStatusList = function () {
          scope.statusListVisible = false;
        };
      }
    };
  };

  statusToggler.$inject = ['ticketsService', 'ticketStatusService', 'toaster'];
  angular.module('panelModule').directive('statusToggler', statusToggler);
}());
