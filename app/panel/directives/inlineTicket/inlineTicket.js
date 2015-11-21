(function () {
  'use strict';

  var inlineTicket = function () {
    return {
      restrict: 'AE',
      templateUrl: 'app/panel/directives/inlineTicket/inlineTicket.html'
    };
  };
  inlineTicket.$inject = [];
  angular.module('panelModule').directive('inlineTicket', inlineTicket);

}());
