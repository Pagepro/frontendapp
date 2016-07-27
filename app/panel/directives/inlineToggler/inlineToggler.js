(function() {
  'use strict';

  var inlineToggler = function(ticketsService, ticketStatusService, toaster) {
    return {
      restrict: 'E',
      replace: true,
      scope: false,
      templateUrl: 'app/panel/directives/inlineToggler/inlineToggler.html',
      link: function(scope) {
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

        var codes = [1, 5, 2, 4, 3];

        scope.statuses = _.map(codes, function (code) {
          return ticketStatusService.getStatus(code);
        });

        scope.setTicketStatus = function (newStatus) {
          ticketsService.setTicketStatus(scope.projectId, scope.ticket.id, newStatus.code)
          .success(function (resp) {
            scope.status = newStatus;
          })
          .error(function() {
            toaster.pop('error', 'Couldn\'t update status.');
          })
        }

        scope.toggleStatusList = function() {
          scope.statusListVisible = !scope.statusListVisible;
        };
      }
    };
  };

  inlineToggler.$inject = ['ticketsService', 'ticketStatusService', 'toaster'];
  angular.module('panelModule').directive('inlineToggler', inlineToggler);
}());
