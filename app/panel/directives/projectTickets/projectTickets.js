(function () {
  'use strict';

  var projectTickets = {
    isolate: false,
    restrict: 'EA',
    templateUrl: 'app/panel/directives/projectTickets/projectTickets.html'
  };

  angular.module('panelModule').component('projectTickets', projectTickets);

}());
