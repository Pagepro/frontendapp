(function() {
  'use strict';

  var projectFile = function () {
    return {
      restrict: 'A',
      templateUrl: 'app/panel/directives/projectFile/projectFile.html'
    };
  };

  angular.module('panelModule').directive('projectFile', projectFile);

}());
