(function () {
  'use strict';

  var inlineTicket = function ($location, ticketStatusService) {
    return {
      restrict: 'AE',
      templateUrl: 'app/panel/directives/inlineTicket/inlineTicket.html',
      link: function (scope, element) {
        scope.status = ticketStatusService.getStatus(scope.ticket.status);
        scope.location = $location.path();

        scope.linkActive = false;

        // Data-ellipsis hack, can't set else in html template,
        // data is being read from a model
        if (!scope.ticket.related_template) {
          scope.ticket.related_template = {
            name: 'Not assigned'
          }
        }

      }
    };
  };
  inlineTicket.$inject = ['$location', 'ticketStatusService'];
  angular.module('panelModule').directive('inlineTicket', inlineTicket);

}());
