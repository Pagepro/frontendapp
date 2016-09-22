(function() {
  'use strict';

  var inlineToggler = function(ticketsService, ticketStatusService, toaster, $timeout, spinnerService) {
    return {
      restrict: 'E',
      scope: true,
      replace: true,
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
        *  6 - RESOLVED

        */

        var codes = [1, 5, 2, 3, 6, 4];

        scope.statuses = _.map(codes, function (code) {
          return ticketStatusService.getStatus(code);
        });

        scope.setTicketStatus = function (newStatus) {
          spinnerService.show('tickets-spinner');
          ticketsService.setTicketStatus(scope.projectId, scope.ticket.id, newStatus.code)
          .success(function (resp) {
            // scope.tickets is just a refference?? need to go deep in scope to acheive actual $apply
            // timeout for digest in progress error
            $timeout(function () {
              scope.$apply(function () {
                scope.$parent.$parent.tickets = _.map(scope.$parent.$parent.tickets, function (ticket) {
                  return (ticket.id === scope.ticket.id) ? resp : ticket;
                });
              });
            });

            scope.status = newStatus;
            toaster.pop('success', 'Ticket\'s status successfully changed to \"' + newStatus.labelContent + '\"');
          })
          .error(function() {
            toaster.pop('error', 'Couldn\'t update status.');
          })
          .finally(function () {
            spinnerService.hide('tickets-spinner');
          });
        };

        scope.toggleStatusList = function() {
          scope.statusListVisible = !scope.statusListVisible;
        };
      }
    };
  };

  inlineToggler.$inject = ['ticketsService', 'ticketStatusService', 'toaster', '$timeout', 'spinnerService'];
  angular.module('panelModule').directive('inlineToggler', inlineToggler);
}());
