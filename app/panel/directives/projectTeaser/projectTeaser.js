(function() {
  'use strict';
  var projectTeaser = function() {
    return {
      restrict: 'E',
      templateUrl: 'app/panel/directives/projectTeaser/projectTeaser.html'
    };
  };

  angular.module('panelModule').directive('projectTeaser', projectTeaser);

}());
