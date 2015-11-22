(function () {
  'use strict';

  var inlineTicket = function (statusService) {
    return {
      restrict: 'AE',
      templateUrl: 'app/panel/directives/inlineTicket/inlineTicket.html',
      link: function (scope) {
        scope.status = statusService.getStatus(scope.ticket.status);
      }
    };
  };
  inlineTicket.$inject = ['statusService'];
  angular.module('panelModule').directive('inlineTicket', inlineTicket);

}());
