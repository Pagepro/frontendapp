(function () {
  'use strict';

  var inlineTicket = function ($location, ticketStatusService) {
    return {
      restrict: 'AE',
      templateUrl: 'app/panel/directives/inlineTicket/inlineTicket.html',
      link: function (scope) {
        scope.status = ticketStatusService.getStatus(scope.ticket.status);
        scope.location = $location.path();
      }
    };
  };
  inlineTicket.$inject = ['$location', 'ticketStatusService'];
  angular.module('panelModule').directive('inlineTicket', inlineTicket);

}());
