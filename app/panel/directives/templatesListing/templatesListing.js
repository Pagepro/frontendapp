(function () {
  'use strict';
  var templatesListing = function () {
    return {
      restrict: 'EA',
      scope: '=',
      templateUrl: 'app/panel/directives/templatesListing/templatesListing.html',
      link: function (scope) {
        scope.activeInput = false;
        scope.toggleInput = function () {
          scope.activeInput = !scope.activeInput;
        };
      }
    };
  };

  angular.module('panelModule').directive('templatesListing', templatesListing);
}());
