(function () {
  'use strict';
  var templatesListing = function () {
    return {
      restrict: 'EA',
      scope: '=',
      templateUrl: 'app/panel/directives/templatesListing/templatesListing.html'
    };
  };

  angular.module('panelModule').directive('templatesListing', templatesListing);
}());
