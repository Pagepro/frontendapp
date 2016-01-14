(function () {
  'use strict';

  var projectFiles = {
    isolate: false,
    restrict: 'EA',
    templateUrl: 'app/panel/directives/projectFiles/projectFiles.html'
  };

  angular.module('panelModule').component('projectFiles', projectFiles);

}());
