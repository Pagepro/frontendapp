(function() {
  'use strict';

  var inlineTicket = function($location, statusService) {
    return {
      restrict: 'AE',
      templateUrl: 'app/panel/directives/inlineTicket/inlineTicket.html',
      link: function(scope) {
        scope.status = statusService.getStatus(scope.ticket.status);
        scope.location = $location.path();
      }
    };
  };
  inlineTicket.$inject = ['$location', 'statusService'];
  angular.module('panelModule').directive('inlineTicket', inlineTicket);

}());
