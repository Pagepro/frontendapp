(function() {
  'use strict';

  var statusToggler = function(ticketsService, ticketStatusService, toaster) {
    return {
      restrict: 'E',
      replace: true,
      scope: false,
      templateUrl: 'app/panel/directives/statusToggler/statusToggler.html',
      link: function(scope) {
        scope.currentStatus = 1;
        scope.availableStatuses = [1, 2, 3, 4, 5];

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