(function () {
  'use strict';

  var projectTickets = function () {
    return {
      isolate: false,
      restrict: 'EA',
      templateUrl: 'app/panel/directives/projectTickets/projectTickets.html'
    };
  };

  angular.module('panelModule').directive('projectTickets', projectTickets);

}());
