(function() {
  'use strict';

  var inlineToggler = function(ticketsService, ticketStatusService, toaster) {
    return {
      restrict: 'E',
      replace: true,
      scope: false,
      templateUrl: 'app/panel/directives/inlineToggler/inlineToggler.html',
      link: function(scope) {
        scope.currentStatus = scope.status.code;
        /*

        On the order of the status codes here,
        depends the order in which they are displayed
        in the component!

        *  1 - NEW
        *  2 - Q&A
        *  3 - REJECTED
        *  4 - FINISHED
        *  5 - IN PROGRESS

        */
        scope.availableStatuses = [1, 5, 2, 4, 3];

        // scope.statuses = ticketStatusService.getStatus(scope.availableStatuses);
        var loadStatuses = function () {
          scope.statuses = _.map(_.pull(scope.availableStatuses, scope.currentStatus), function (status) {
            return ticketStatusService.getStatus(status);
          });
        };

        loadStatuses();
        scope.statusListVisible = false;


        scope.setTicketStatus = function(newStatus) {
          var statusHolder = scope.currentStatus;
          if (statusHolder !== newStatus) {
            ticketsService.setTicketStatus(scope.projectId, scope.ticket.id, newStatus)
              .success(function() {
                toaster.pop('success', 'Successfully updated the status.');
                statusHolder = newStatus;
              })
              .error(function() {
                toaster.pop('error', 'Couldn\'t update status.');
              })
              .finally(function () {
                scope.currentStatus = statusHolder;
                loadStatuses();
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

  inlineToggler.$inject = ['ticketsService', 'ticketStatusService', 'toaster'];
  angular.module('panelModule').directive('inlineToggler', inlineToggler);
}());
